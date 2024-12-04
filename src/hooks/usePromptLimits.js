import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useSubscription } from './useSubscription';

const FREE_PROMPT_LIMIT = 10;

export const usePromptLimits = () => {
  const { data: { isSubscribed } = { isSubscribed: false }, subscription } = useSubscription();

  // For testing: Uncomment this line to simulate premium user
  // const isPremium = true;
  const isPremium = subscription?.status === 'active';

  const { data: promptCount = 0 } = useQuery({
    queryKey: ['prompt-count'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      console.log('Fetching prompt count for user:', user.id);
      
      // Get count of user's active prompts
      const { count, error } = await supabase
        .from('prompts')
        .select('id', { count: 'exact' })  // Only select id field for counting
        .eq('user_id', user.id)
        .is('deleted_at', null);  // Only count non-deleted prompts

      if (error) {
        console.error('Error fetching prompt count:', error);
        throw error;
      }

      console.log('Active prompts count:', count, 'for user:', user.id);
      return count || 0;
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  return {
    canCreatePrompt: isSubscribed || promptCount < FREE_PROMPT_LIMIT,
    promptCount,
    promptLimit: isSubscribed ? Infinity : FREE_PROMPT_LIMIT,
    isSubscribed,
    remainingPrompts: isSubscribed ? Infinity : Math.max(0, FREE_PROMPT_LIMIT - promptCount)
  };
};
