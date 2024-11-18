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

    // Prepare the prompt data
    const promptInsertData = {
      title: promptData.title,
      content: promptData.content,
      description: promptData.description || null,
      tags: promptData.tags || [],
      is_public: promptData.isPublic || false,
      version: 1,
      user_id: user.id
    };

    // Only add team_id and group_id if they are valid UUIDs
    if (promptData.teamId && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(promptData.teamId)) {
      promptInsertData.team_id = promptData.teamId;
    }
    
    if (promptData.groupId && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(promptData.groupId)) {
      promptInsertData.group_id = promptData.groupId;
    }

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