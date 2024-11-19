import { supabase } from '@/lib/supabase';
import { toast } from "sonner";
import { queryClient } from '@/lib/react-query';

export const createPrompt = async (promptData) => {
  console.log('Creating prompt with data:', promptData);

  if (!promptData.title || !promptData.content) {
    toast.error('Title and content are required');
    throw new Error('Title and content are required');
  }

  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      console.error('Authentication error:', userError);
      toast.error('Please sign in to create prompts');
      throw new Error('Authentication required');
    }

    // Test the connection first
    const { error: connectionError } = await supabase
      .from('prompts')
      .select('count')
      .limit(1);

    if (connectionError) {
      console.error('Connection error:', connectionError);
      toast.error(`Database connection failed: ${connectionError.message}`);
      throw new Error('Database connection failed');
    }

    // Prepare the prompt data according to the database schema
    const promptInsertData = {
      title: promptData.title,
      content: promptData.content,
      description: promptData.description || null,
      tags: promptData.tags || [],
      is_public: promptData.isPublic || false,
      version: 1,
      user_id: user.id,
      team_id: promptData.teamId || null,
      group_id: promptData.groupId || null,
      change_description: promptData.changeDescription || null
    };

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

    queryClient.invalidateQueries({ queryKey: ['prompts'] });
    toast.success('Prompt created successfully!');
    return data[0];
  } catch (error) {
    console.error('Error in createPrompt:', error);
    toast.error(`Failed to create prompt: ${error.message}`);
    throw error;
  }
};

export const getPrompt = async (promptId) => {
  if (!promptId) {
    toast.error('Prompt ID is required');
    throw new Error('Prompt ID is required');
  }

  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      console.error('Authentication error:', userError);
      toast.error('Please sign in to view prompts');
      throw new Error('Authentication required');
    }

    const { data, error } = await supabase
      .from('prompts')
      .select(`
        *,
        favorites!left(*),
        groups:group_id(
          id,
          name,
          description
        )
      `)
      .eq('id', promptId)
      .single();

    if (error) {
      console.error('Error fetching prompt:', error);
      toast.error(`Failed to fetch prompt: ${error.message}`);
      throw error;
    }

    if (!data) {
      toast.error('Prompt not found');
      throw new Error('Prompt not found');
    }

    // Transform the data to include the starred status
    const promptWithFavorites = {
      ...data,
      starred: data.favorites?.some(fav => fav.user_id === user.id) || false
    };

    return promptWithFavorites;
  } catch (error) {
    console.error('Error in getPrompt:', error);
    throw error;
  }
};