import { useQuery } from '@tanstack/react-query';
import { getChallenges } from '@/services/challenge';



export const CHALLENGES_QUERY_KEY = ['CHALLENGES'] as const;

export const useChallenges = () => {

  const {
    data: challenges,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: CHALLENGES_QUERY_KEY,
    queryFn:getChallenges,  
  })
    

  return {
    challenges,
    isLoading,
    isFetching,
    error,
    refetch,
  };
}