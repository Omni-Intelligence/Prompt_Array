import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useSubscription } from './useSubscription';

export const usePromptLimits = () => {
  const { subscription } = useSubscription();
  const isPremium = true;

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
    canCreatePrompt: true, // Always allow prompt creation
    promptCount,
    promptLimit: Infinity, // No limit on prompts
    isSubscribed: true, // Always treat as subscribed
    remainingPrompts: Infinity // Unlimited remaining prompts
  };
};
