import { supabase } from '@/lib/supabase'
import { toast } from "sonner"

export const createPrompt = async (promptData) => {
  console.log('Creating prompt with data:', promptData);

  if (!promptData.title || !promptData.content) {
    toast.error('Title and content are required');
    throw new Error('Title and content are required');
  }

  try {
    // Test the connection first
    const { data: connectionTest, error: connectionError } = await supabase
      .from('prompts')
      .select('count')
      .limit(1);

    if (connectionError) {
      console.error('Connection error:', connectionError);
      toast.error('Failed to connect to database. Please check your configuration.');
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
          // Temporarily remove user_id requirement
          user_id: '00000000-0000-0000-0000-000000000000' // Placeholder UUID
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
    toast.error(error.message || 'Failed to create prompt');
    throw error;
  }
}