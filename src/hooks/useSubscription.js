import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export const useSubscription = () => {
  return useQuery({
    queryKey: ['subscription'],
    queryFn: async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        return { isSubscribed: false };
      }

      // Get the user's subscription status from the subscriptions table
      const { data: subscription, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        // If table doesn't exist yet or no subscription found, return not subscribed
        if (error.code === '404' || error.code === 'PGRST116') {
          return { isSubscribed: false };
        }
        console.error('Error fetching subscription:', error);
        throw error;
      }

      return {
        isSubscribed: subscription?.status === 'active',
        subscription
      };
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    cacheTime: 1000 * 60 * 30, // Keep in cache for 30 minutes
  });
};
