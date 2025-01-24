import { useMutation } from "@tanstack/react-query";
import { likeComment } from "@/services/challenge_api";
// import { ChallengeFormData } from "@/types/challenge";
// import { useNavigate } from "react-router";
import { useToast } from "@/hooks/use-toast";
// import { authStore } from "@/store/authstore";


export const useLikeComment = () => {
  // const navigate = useNavigate();
  const { toast } = useToast();
  // const { selectedId} = authStore();

  //   const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => likeComment(data),
    onSuccess: (data) => {
      console.log(data)
      toast({
        description: "comment liked.",
      });
      // navigate(`/submission/${selectedId}`);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: error.response.data.message,
        description: "failed to like comment",
      });
    },
  });
};