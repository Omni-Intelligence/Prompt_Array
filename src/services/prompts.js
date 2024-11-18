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

    // Prepare the prompt data - handle null/empty values for UUID fields
    const promptInsertData = {
      title: promptData.title,
      content: promptData.content,
      description: promptData.description || null,
      tags: promptData.tags || [],
      is_public: promptData.isPublic || false,
      team_id: promptData.teamId || null,  // Handle null/empty values
      group_id: promptData.groupId || null, // Handle null/empty values
      version: 1,
      user_id: user.id
    };

    // Remove any undefined or null UUID fields to prevent database errors
    if (!promptInsertData.team_id) delete promptInsertData.team_id;
    if (!promptInsertData.group_id) delete promptInsertData.group_id;

    console.log('Attempting to insert prompt with data:', promptInsertData);

    const { data, error } = await supabase
      .from('prompts')
      .insert([promptInsertData])
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