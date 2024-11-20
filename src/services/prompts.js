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

    // Create initial version
    await createPromptVersion(data[0].id, {
      ...promptData,
      changeDescription: 'Initial version'
    });

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

export const getPromptVersions = async (promptId) => {
  try {
    const { data, error } = await supabase
      .from('prompt_versions')
      .select(`
        id,
        version_number,
        title,
        content,
        prompt_description,
        tags,
        is_public,
        team_id,
        group_id,
        version_description,
        created_at,
        created_by,
        profiles:created_by (
          full_name,
          avatar_url
        )
      `)
      .eq('prompt_id', promptId)
      .order('version_number', { ascending: false });

    if (error) {
      console.error('Error fetching prompt versions:', error);
      throw error;
    }

    // Transform the data to match the expected format
    return data.map(version => ({
      id: version.id,
      version: version.version_number,
      title: version.title,
      content: version.content,
      description: version.prompt_description,
      tags: version.tags || [],
      isPublic: version.is_public,
      teamId: version.team_id,
      groupId: version.group_id,
      changeDescription: version.version_description,
      createdAt: version.created_at,
      createdBy: version.profiles?.full_name || 'Unknown'
    }));
  } catch (error) {
    console.error('Error in getPromptVersions:', error);
    throw error;
  }
};

export const createPromptVersion = async (promptId, versionData) => {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      throw new Error('Authentication required');
    }

    const versionInsertData = {
      prompt_id: promptId,
      title: versionData.title,
      content: versionData.content,
      prompt_description: versionData.description || null,
      tags: versionData.tags || [],
      is_public: versionData.isPublic || false,
      team_id: versionData.teamId || null,
      group_id: versionData.groupId || null,
      version_description: versionData.changeDescription || null,
      created_by: user.id
    };

    const { data, error } = await supabase
      .from('prompt_versions')
      .insert(versionInsertData)
      .select()
      .single();

    if (error) {
      console.error('Error creating prompt version:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in createPromptVersion:', error);
    throw error;
  }
};

export const updatePrompt = async (promptId, promptData) => {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      throw new Error('Authentication required');
    }

    // First create a new version entry
    const versionResult = await createPromptVersion(promptId, {
      ...promptData,
      changeDescription: promptData.changeDescription || 'Updated prompt'
    });

    // Then update the prompt with the latest data
    const promptUpdateData = {
      title: promptData.title,
      content: promptData.content,
      description: promptData.description || null,
      tags: promptData.tags || [],
      is_public: promptData.isPublic || false,
      team_id: promptData.teamId || null,
      group_id: promptData.groupId || null,
      last_version_number: versionResult.version_number // Keep track of latest version
    };

    const { data, error } = await supabase
      .from('prompts')
      .update(promptUpdateData)
      .eq('id', promptId)
      .select()
      .single();

    if (error) {
      console.error('Error updating prompt:', error);
      throw error;
    }

    // Invalidate queries to refresh the UI
    queryClient.invalidateQueries({ queryKey: ['prompts'] });
    queryClient.invalidateQueries({ queryKey: ['promptVersions', promptId] });

    return data;
  } catch (error) {
    console.error('Error in updatePrompt:', error);
    throw error;
  }
};

export const deletePrompt = async (promptId) => {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      throw new Error('Authentication required');
    }

    // Delete the prompt and its versions (cascade delete should handle versions)
    const { error } = await supabase
      .from('prompts')
      .delete()
      .eq('id', promptId);

    if (error) {
      console.error('Error deleting prompt:', error);
      throw error;
    }

    // Invalidate queries to refresh the UI
    queryClient.invalidateQueries({ queryKey: ['prompts'] });
    toast.success('Prompt deleted successfully');

  } catch (error) {
    console.error('Error in deletePrompt:', error);
    toast.error(`Failed to delete prompt: ${error.message}`);
    throw error;
  }
};