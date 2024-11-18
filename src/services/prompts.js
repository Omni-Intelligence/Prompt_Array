import { supabase } from '@/lib/supabase'
import { toast } from "sonner"

export const createPrompt = async (promptData) => {
  console.log('Creating prompt with data:', promptData);

  if (!promptData.title || !promptData.content) {
    toast.error('Title and content are required');
    throw new Error('Title and content are required');
  }

  try {
    // First check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      console.error('Authentication error:', authError);
      toast.error('Please sign in to create prompts');
      throw new Error('Authentication required');
    }

    const { data, error } = await supabase
      .from('prompts')
      .insert([
        {
          title: promptData.title,
          content: promptData.content,
          description: promptData.description,
          tags: promptData.tags,
          is_public: promptData.isPublic,
          team_id: promptData.teamId || null,
          group_id: promptData.groupId || null,
          version: 1,
          change_description: promptData.changeDescription || null,
          user_id: user.id
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      toast.error(`Failed to create prompt: ${error.message}`);
      throw error;
    }

    if (!data || data.length === 0) {
      const noDataError = 'No data returned from Supabase';
      console.error(noDataError);
      toast.error(noDataError);
      throw new Error(noDataError);
    }

    console.log('Prompt created successfully:', data[0]);
    toast.success('Prompt created successfully!');
    return data[0];
  } catch (error) {
    console.error('Error in createPrompt:', error);
    // Ensure the user sees the error message
    toast.error(error.message || 'Failed to create prompt');
    throw error;
  }
}