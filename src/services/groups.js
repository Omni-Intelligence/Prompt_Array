import { supabase } from '@/lib/supabase';

export const getGroups = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('groups')
    .select(`
      id,
      name,
      description,
      created_at,
      updated_at
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
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

export const createGroup = async ({ title, description }) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('groups')
    .insert([{
      name: title,
      description,
      user_id: user.id
    }])
    .select();

  if (error) throw error;
  return data[0];
};

export const updateGroup = async (groupId, { name, description }) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('groups')
    .update({
      name,
      description,
      updated_at: new Date().toISOString()
    })
    .eq('id', groupId)
    .eq('user_id', user.id)
    .select();

  if (error) throw error;
  return data[0];
};

export const deleteGroup = async (groupId) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User not authenticated');
  }

  const { error } = await supabase
    .from('groups')
    .delete()
    .eq('id', groupId)
    .eq('user_id', user.id);

  if (error) throw error;
  return true;
};
