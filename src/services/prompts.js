import { supabase } from '@/lib/supabase'
import { toast } from "sonner"

export const createPrompt = async (promptData) => {
  console.log('Creating prompt with data:', promptData);

  if (!promptData.title || !promptData.content) {
    toast.error('Title and content are required');
    throw new Error('Title and content are required');
  }

  try {
    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      console.error('Authentication error:', userError);
      toast.error('Please sign in to create prompts');
      throw new Error('Authentication required');
    }

    // Test the connection first
    const { data: connectionTest, error: connectionError } = await supabase
      .from('prompts')
      .select('count')
      .limit(1);

    if (connectionError) {
      console.error('Connection error:', connectionError);
      toast.error(`Database connection failed: ${connectionError.message}`);
      throw new Error('Database connection failed');
    }

    console.log('Database connection successful');

    // Log the actual insert operation
    console.log('Attempting to insert prompt with data:', {
      title: promptData.title,
      content: promptData.content,
      description: promptData.description,
      tags: promptData.tags,
      is_public: promptData.isPublic,
      team_id: promptData.teamId,
      group_id: promptData.groupId,
    });

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
      console.error('Supabase insert error:', error);
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
    toast.error(`Failed to create prompt: ${error.message}`);
    throw error;
  }
}