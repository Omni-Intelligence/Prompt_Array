import { supabase } from '@/lib/supabase';

export const getGroups = async () => {
  const { data, error } = await supabase
    .from('groups')
    .select(`
      id,
      name,
      description,
      created_at,
      updated_at
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const getGroupPrompts = async (groupId) => {
  const { data, error } = await supabase
    .from('prompts')
    .select(`
      id,
      title,
      content,
      created_at,
      updated_at,
      user_id
    `)
    .eq('group_id', groupId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};
