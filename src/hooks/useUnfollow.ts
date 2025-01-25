import { useMutation } from "@tanstack/react-query";
// import { useNavigate } from "react-router";
import { useToast } from "@/hooks/use-toast";
import { unFollowUser } from "@/services/user_api";

export const QUERY_KEY = ["FOLLOW"] as const;

export const useUnfollow = () => {

    const { toast } = useToast();
    //   const navigate = useNavigate();
    return useMutation({
      mutationFn: (data: string) => unFollowUser(data),
      onSuccess: () => {
        toast({
          description: "Unfollowed user.",
        });
        //   navigate("/challenge");
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: error.response.data.message,
          description:
            "unFollowed failed, try again",
        });
      },
    });
};