import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

const ACTIVE_SUBSCRIPTION_STATUSES = ['active', 'trialing'];

export const useSubscription = () => {
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

      console.log(`Subscription Debug: Querying subscriptions table for user ${user.id}...`);
      // Get ALL subscriptions for the user
      const { data: subscriptions, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id);

      console.log('Subscription Debug: Raw subscriptions data:', subscriptions);
      console.log('Subscription Debug: Query error:', error);

      if (error) {
        // If table doesn't exist yet or no subscription found, return not subscribed
        if (error.code === '404' || error.code === 'PGRST116') {
          console.log('Subscription Debug: No subscription table or no subscription found');
          return { isSubscribed: false };
        }
        console.error('Subscription Debug: Error fetching subscription:', error);
        throw error;
      }

      // Find any active subscription
      const activeSubscription = subscriptions?.find(sub => 
        ACTIVE_SUBSCRIPTION_STATUSES.includes(sub.status)
      );
      
      const isSubscribed = !!activeSubscription;
      console.log('Subscription Debug: Final subscription state:', {
        isSubscribed,
        activeSubscription,
        allSubscriptions: subscriptions,
        validStatuses: ACTIVE_SUBSCRIPTION_STATUSES
      });

      return {
        isSubscribed,
        subscription: activeSubscription
      };
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    cacheTime: 1000 * 60 * 30, // Keep in cache for 30 minutes
  });

  // Return an object with all the necessary states
  return {
    isSubscribed: data?.isSubscribed ?? false,
    subscription: data?.subscription,
    isLoading,
    error
  };
};
