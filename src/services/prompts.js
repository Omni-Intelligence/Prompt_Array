import { supabase } from '@/lib/supabase'

export const createPrompt = async (promptData) => {
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
        change_description: promptData.changeDescription || null
      }
    ])
    .select()

  if (error) {
    throw error
  }

  return data[0]
}