import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

const ACTIVE_SUBSCRIPTION_STATUSES = ['active', 'trialing'];

export const useSubscription = () => {
  return useQuery({
    queryKey: ['subscription'],
    queryFn: async () => {
      console.log(' Fetching subscription data...');
      
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      console.log(' User data:', user);
      
      if (userError || !user) {
        console.log(' No user found or error:', userError);
        return { isSubscribed: false };
      }

      console.log(` Querying subscriptions table for user ${user.id}...`);
      // Get ALL subscriptions for the user
      const { data: subscriptions, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id);

      console.log(' Raw subscriptions data:', subscriptions);
      console.log(' Subscription error:', error);

      if (error) {
        // If table doesn't exist yet or no subscription found, return not subscribed
        if (error.code === '404' || error.code === 'PGRST116') {
          console.log(' No subscription table or no subscription found');
          return { isSubscribed: false };
        }
        console.error(' Error fetching subscription:', error);
        throw error;
      }

      // Find any active subscription
      const activeSubscription = subscriptions?.find(sub => 
        ACTIVE_SUBSCRIPTION_STATUSES.includes(sub.status)
      );
      
      const isSubscribed = !!activeSubscription;
      console.log(' Final subscription state:', {
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
};
