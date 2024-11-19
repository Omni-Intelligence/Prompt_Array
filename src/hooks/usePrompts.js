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

      console.log('Fetching prompts for user:', user.id);

      // First, let's verify the prompts table structure
      const { data: tableInfo } = await supabase
        .from('prompts')
        .select('*')
        .limit(1);
      
      console.log('Table structure:', tableInfo);

      // Get all prompts without any filters first
      const { data: prompts, error } = await supabase
        .from('prompts')
        .select('*, favorites!inner(*)')
        .order('created_at', { ascending: false });
      
      console.log('Fetched prompts:', prompts);
      console.log('Query error if any:', error);

      if (error) {
        console.error('Supabase query error:', error);
        throw error;
      }

      if (!prompts) {
        console.log('No prompts found');
        return [];
      }

      // Transform the data to include the starred status
      const promptsWithFavorites = prompts.map(prompt => ({
        ...prompt,
        starred: prompt.favorites?.some(fav => fav.user_id === user.id) || false
      }));

      console.log('Processed prompts:', promptsWithFavorites);

      return promptsWithFavorites;
    },
    retry: 1,
    refetchOnWindowFocus: true
  });
};