import { supabase } from '@/lib/supabase';
import { toast } from "sonner";

export const getTemplates = async () => {
  try {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching templates:', error);
      toast.error('Failed to fetch templates');
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getTemplates:', error);
    throw error;
  }
};
