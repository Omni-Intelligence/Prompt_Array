import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export const useGroups = () => {
  const queryClient = useQueryClient();

  const { data: groups = [], isLoading } = useQuery({
    queryKey: ['groups'],
    queryFn: async () => {
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
          updated_at,
          user_id
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        toast.error(`Error fetching groups: ${error.message}`);
        throw error;
      }
      return data || [];
    }
  });

  const createGroup = useMutation({
    mutationFn: async (newGroup) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('groups')
        .insert([{
          name: newGroup.title,
          description: newGroup.description,
          user_id: user.id,
        }])
        .select()
        .single();

      if (error) {
        toast.error(`Error creating group: ${error.message}`);
        throw error;
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
      toast.success("Group created successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to create group: ${error.message}`);
    }
  });

  return {
    groups,
    isLoading,
    createGroup
  };
};