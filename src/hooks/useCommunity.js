import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCommunityPrompts, forkPrompt } from '@/services/community';
import { toast } from 'sonner';

export const useCommunityPrompts = ({ filter = 'latest', searchQuery = '' } = {}) => {
  return useQuery({
    queryKey: ['community-prompts', filter, searchQuery],
    queryFn: () => getCommunityPrompts({ filter, searchQuery }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useForkPrompt = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: forkPrompt,
    onSuccess: () => {
      toast.success('Prompt forked successfully!');
      queryClient.invalidateQueries({ queryKey: ['prompts'] });
      queryClient.invalidateQueries({ queryKey: ['community-prompts'] });
    },
    onError: (error) => {
      console.error('Error forking prompt:', error);
      toast.error('Failed to fork prompt. Please try again.');
    },
  });
};
