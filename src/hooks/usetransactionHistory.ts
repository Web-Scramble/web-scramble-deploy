import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTransactionHistory } from "@/services/payment_api";

export const QUERY_KEY = ["TRANSACTION_HISTORY"] as const;

export const useTransactionHistory = () => {
// export const useTransactionHistory = (id:string) => {
  // const queryClient = useQueryClient();
  // queryClient.invalidateQueries({ queryKey:CHALLENGES_QUERY_KEY})

  const {
    data: transactions,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: QUERY_KEY,
    queryFn:getTransactionHistory,
  });

  return {
    transactions,
    isLoading,
    isFetching,
    error,
    refetch,
  };
};
