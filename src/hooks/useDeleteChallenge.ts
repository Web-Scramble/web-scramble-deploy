import { useQuery } from '@tanstack/react-query';
import { deleteChallenge } from '@/services/challenge';



export const QUERY_KEY = ['DELETE_CHALLENGES'] as const;

export const useChallenges = (id:string) => {

  const {
    data: challenges,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: QUERY_KEY,
    queryFn:deleteChallenge(id),  
  })
    

  return {
    challenges,
    isLoading,
    isFetching,
    error,
    refetch,
  };
}