import { supabase } from '@/lib/supabase';
import { toast } from "sonner";

export const toggleFavorite = async (promptId) => {
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError) {
    toast.error('You must be logged in to favorite prompts');
    throw userError;
  }

  // Check if prompt is already favorited
  const { data: existingFavorite } = await supabase
    .from('favorites')
    .select()
    .eq('user_id', user.id)
    .eq('prompt_id', promptId)
    .single();

  if (existingFavorite) {
    // Remove favorite
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', user.id)
      .eq('prompt_id', promptId);

    if (error) {
      toast.error('Failed to remove from favorites');
      throw error;
    }
    
    toast.success('Removed from favorites');
    return false;
  } else {
    // Add favorite
    const { error } = await supabase
      .from('favorites')
      .insert([{ user_id: user.id, prompt_id: promptId }]);

    if (error) {
      toast.error('Failed to add to favorites');
      throw error;
    }
    
    toast.success('Added to favorites');
    return true;
  }
};