import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getChallenges } from '@/services/challenge';

// export const useChallenges = () => {
//   return useQuery(["GetChallenges"], getChallenges());
// };


export const CHALLENGES_QUERY_KEY = ['CHALLENGES'] as const;

export const useChallenges = () => {
//   const queryClient = useQueryClient();

  const {
    data: challenges,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: CHALLENGES_QUERY_KEY,
    queryFn:getChallenges })// Consider data fresh for 5 minutes

  return {
    challenges,
    isLoading,
    isFetching,
    error,
    refetch,
  };
}