import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

const ACTIVE_SUBSCRIPTION_STATUSES = ['active', 'trialing'];

export const useSubscription = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['subscription'],
    queryFn: async () => {
      console.log('Subscription Debug: Fetching subscription data...');
      
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      console.log('Subscription Debug: User data:', {
        userId: user?.id,
        userEmail: user?.email,
        error: userError
      });
      
      if (userError || !user) {
        console.log('Subscription Debug: No user found or error:', userError);
        return { isSubscribed: false };
      }

      try {
        console.log(`Subscription Debug: Querying subscriptions table for user ${user.id}...`);
        // Get ALL subscriptions for the user
        const { data: subscriptions, error } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1);

        console.log('Subscription Debug: Raw subscriptions data:', subscriptions);
        
        if (error) {
          console.error('Subscription Debug: Error fetching subscription:', error);
          throw error;
        }

        // Get the most recent subscription
        const latestSubscription = subscriptions?.[0];
        
        const isSubscribed = latestSubscription?.status === 'active';
        
        console.log('Subscription Debug: Final subscription state:', {
          isSubscribed,
          latestSubscription,
          status: latestSubscription?.status,
        });

        return {
          isSubscribed,
          subscription: latestSubscription
        };
      } catch (error) {
        console.error('Subscription Debug: Unexpected error:', error);
        // Don't throw the error, return a safe default
        return { isSubscribed: false };
      }
    },
    staleTime: 1000 * 60, // Cache for 1 minute
    cacheTime: 1000 * 60 * 5, // Keep in cache for 5 minutes
    retry: 2, // Retry failed requests twice
  });

  const refreshSubscription = async () => {
    console.log('Subscription Debug: Manually refreshing subscription...');
    try {
      await queryClient.invalidateQueries(['subscription']);
      console.log('Subscription Debug: Subscription refreshed successfully');
    } catch (error) {
      console.error('Subscription Debug: Refresh failed:', error);
      throw error;
    }
  };

  return {
    isSubscribed: data?.isSubscribed ?? false,
    subscription: data?.subscription,
    isLoading,
    error,
    refreshSubscription
  };
};
