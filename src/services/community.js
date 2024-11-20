import { supabase } from '@/lib/supabase';

export const getCommunityPrompts = async ({ filter = 'latest', searchQuery = '' }) => {
  try {
    console.log('Fetching community prompts with:', { filter, searchQuery });
    
    // Get public prompts
    let query = supabase
      .from('prompts')
      .select('*')
      .eq('is_public', true);

    // Apply filter
    switch (filter) {
      case 'latest':
        query = query.order('created_at', { ascending: false });
        break;
      case 'oldest':
        query = query.order('created_at', { ascending: true });
        break;
      default:
        query = query.order('created_at', { ascending: false });
    }

    const { data: prompts, error } = await query;

    if (error) {
      console.error('Error fetching community prompts:', error);
      throw error;
    }

    // Filter by search query if provided
    let filteredPrompts = prompts;
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      filteredPrompts = prompts.filter(prompt => 
        prompt.title?.toLowerCase().includes(searchLower) ||
        prompt.description?.toLowerCase().includes(searchLower)
      );
    }

    return filteredPrompts.map(prompt => ({
      ...prompt,
      author: {
        id: null,
        full_name: 'Anonymous',
        avatar_url: null
      }
    }));
  } catch (error) {
    console.error('Error in getCommunityPrompts:', error);
    throw error;
  }
};

export const forkPrompt = async (promptId) => {
  try {
    // First, get the prompt data
    const { data: promptData, error: promptError } = await supabase
      .from('prompts')
      .select('*')
      .eq('id', promptId)
      .single();

    if (promptError) throw promptError;

    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;

    // Create a new prompt as a fork
    const { data, error } = await supabase
      .from('prompts')
      .insert([
        {
          title: promptData.title,
          description: promptData.description,
          content: promptData.content,
          user_id: user.id,
          is_public: false, // Set to private by default
          forked_from: promptId
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error in forkPrompt:', error);
    throw error;
  }
};
