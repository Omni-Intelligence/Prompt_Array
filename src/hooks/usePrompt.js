import { useQuery } from '@tanstack/react-query';
import { getPrompt } from '@/services/prompts';

export const usePrompt = (promptId) => {
  return useQuery({
    queryKey: ['prompt', promptId],
    queryFn: () => getPrompt(promptId),
    enabled: !!promptId,
    retry: 1,
    refetchOnWindowFocus: true
  });
};
