import { supabase } from '@/lib/supabase';

export const getGroups = async () => {
  const { data, error } = await supabase
    .from('groups')
    .select(`
      id,
      name,
      description,
      created_at,
      prompts:chain_prompts(count)
    `)
    .order('created_at', { ascending: false })
    .limit(6);

  if (error) throw error;

  return data.map(group => ({
    ...group,
    count: group.prompts[0]?.count || 0
  }));
};
