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

      // Get user's prompts with favorite status
      const { data: prompts, error } = await supabase
        .from('prompts')
        .select(`
          *,
          favorites!inner (
            user_id
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;

      // Get user's favorites
      const { data: favorites, error: favoritesError } = await supabase
        .from('favorites')
        .select('prompt_id')
        .eq('user_id', user.id);

      if (favoritesError) throw favoritesError;

      // Add favorite status to prompts
      const promptsWithFavorites = prompts.map(prompt => ({
        ...prompt,
        starred: favorites.some(fav => fav.prompt_id === prompt.id)
      }));

      return promptsWithFavorites;
    }
  });
};