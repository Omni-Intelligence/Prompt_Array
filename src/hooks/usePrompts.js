import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const usePrompts = () => {
  return useQuery({
    queryKey: ['prompts'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Get all prompts with a LEFT JOIN on favorites to include prompts without favorites
      const { data: prompts, error } = await supabase
        .from('prompts')
        .select(`
          *,
          favorites:favorites(user_id)
        `)
        .eq('user_id', user.id) // Only get prompts for the current user
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase query error:', error);
        throw error;
      }

      if (!prompts) {
        return [];
      }

      // Transform the data to include the starred status
      const promptsWithFavorites = prompts.map(prompt => ({
        ...prompt,
        starred: prompt.favorites?.some(fav => fav.user_id === user.id) || false
      }));

      return promptsWithFavorites;
    },
    staleTime: 0, // Consider the data stale immediately
    refetchOnMount: true, // Refetch when the component mounts
    refetchOnWindowFocus: true, // Refetch when the window regains focus
  });
};