import { supabase } from '@/lib/supabase';

export const getCommunityPrompts = async ({ filter = 'latest', searchQuery = '' }) => {
  try {
    // Base query without upvotes
    let query = supabase
      .from('prompts')
      .select(`
        *,
        author:users(id, full_name, avatar_url)
      `)
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

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching community prompts:', error);
      throw error;
    }

    // Process the data
    let processedData = (data || []).map(prompt => ({
      ...prompt,
      author: {
        ...prompt.author,
        full_name: prompt.author?.full_name || 'Anonymous'
      }
    }));

    // Filter by search query if provided
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      processedData = processedData.filter(prompt => 
        prompt.title?.toLowerCase().includes(searchLower) ||
        prompt.description?.toLowerCase().includes(searchLower) ||
        prompt.author?.full_name?.toLowerCase().includes(searchLower)
      );
    }

    return processedData;
  } catch (error) {
    console.error('Error in getCommunityPrompts:', error);
    throw error;
  }
};

export const forkPrompt = async (promptId) => {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  // Get the prompt to fork
  const { data: promptToFork, error: promptError } = await supabase
    .from('prompts')
    .select('*')
    .eq('id', promptId)
    .single();

  if (promptError) throw promptError;

  // Create the forked prompt
  const { data: forkedPrompt, error: forkError } = await supabase
    .from('prompts')
    .insert([
      {
        title: `${promptToFork.title} (Forked)`,
        description: promptToFork.description,
        content: promptToFork.content,
        is_public: false,
        user_id: user.id,
        forked_from: promptId
      }
    ])
    .select()
    .single();

  if (forkError) throw forkError;

  return forkedPrompt;
};
