import { supabase } from '@/lib/supabase'

export const createPrompt = async (promptData) => {
  console.log('Creating prompt with data:', promptData);

  if (!promptData.title || !promptData.content) {
    throw new Error('Title and content are required');
  }

  try {
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
          user_id: (await supabase.auth.getUser()).data.user?.id
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    if (!data || data.length === 0) {
      throw new Error('No data returned from Supabase');
    }

    console.log('Prompt created successfully:', data[0]);
    return data[0];
  } catch (error) {
    console.error('Error in createPrompt:', error);
    throw new Error(error.message || 'Failed to create prompt');
  }
}