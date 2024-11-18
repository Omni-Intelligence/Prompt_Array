import { supabase } from '@/lib/supabase'
import { toast } from "sonner"
import { queryClient } from '@/lib/react-query'

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

    // Remove any potential invalid values
    if (!promptData.teamId) {
      delete promptInsertData.team_id;
    }
    
    if (!promptData.groupId) {
      delete promptInsertData.group_id;
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

    // Invalidate the prompts query to trigger a refetch
    queryClient.invalidateQueries({ queryKey: ['prompts'] });

    console.log('Prompt created successfully:', data[0]);
    toast.success('Prompt created successfully!');
    return data[0];
  } catch (error) {
    console.error('Error in createPrompt:', error);
    toast.error(`Failed to create prompt: ${error.message}`);
    throw error;
  }
}
