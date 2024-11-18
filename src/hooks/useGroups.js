import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export const useGroups = () => {
  const queryClient = useQueryClient();

  const { data: groups = [], isLoading } = useQuery({
    queryKey: ['groups'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('groups')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  const createGroup = useMutation({
    mutationFn: async (newGroup) => {
      const { data, error } = await supabase
        .from('groups')
        .insert([newGroup])
        .select()
        .single();

      if (error) throw error;
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