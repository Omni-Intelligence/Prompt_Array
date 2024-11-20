import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { createGroup, updateGroup, deleteGroup } from "@/services/groups";

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

  const createGroupMutation = useMutation({
    mutationFn: createGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
      toast.success("Group created successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to create group: ${error.message}`);
    }
  });

  const updateGroupMutation = useMutation({
    mutationFn: ({ id, ...data }) => updateGroup(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
      toast.success("Group updated successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to update group: ${error.message}`);
    }
  });

  const deleteGroupMutation = useMutation({
    mutationFn: deleteGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
      toast.success("Group deleted successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to delete group: ${error.message}`);
    }
  });

  return {
    groups,
    isLoading,
    createGroup: createGroupMutation.mutate,
    updateGroup: updateGroupMutation.mutate,
    deleteGroup: deleteGroupMutation.mutate,
    isCreating: createGroupMutation.isLoading,
    isUpdating: updateGroupMutation.isLoading,
    isDeleting: deleteGroupMutation.isLoading
  };
};