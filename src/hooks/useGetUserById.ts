import { useQuery} from "@tanstack/react-query";
import { getUserById } from "@/services/user_api";

export const QUERY_KEY = ["GET_USER_BY_ID"] as const;

export const useGetUserById = (id:string) => {

  const {
    data: getUser,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: QUERY_KEY,
    queryFn:()=>getUserById(id),
  });

  return {
    getUser,
    isLoading,
    isFetching,
    error,
    refetch,
  };
};
