import { useQuery } from '@tanstack/react-query';
import { getChains, getChain, createChain, updateChain, deleteChain } from '@/services/chains';

export const useChains = () => {
  return {
    ...useQuery({
      queryKey: ['chains'],
      queryFn: getChains,
      staleTime: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    }),
    createChain,
    updateChain,
    deleteChain,
  };
};

export const useChain = (chainId) => {
  return {
    ...useQuery({
      queryKey: ['chain', chainId],
      queryFn: () => getChain(chainId),
      enabled: !!chainId,
    }),
    updateChain,
    deleteChain,
  };
};
