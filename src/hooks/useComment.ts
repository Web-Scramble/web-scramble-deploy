import { useMutation } from "@tanstack/react-query";
import { createComment } from "@/services/challenge_api";
import { ChallengeFormData } from "@/types/challenge";
import { useNavigate } from "react-router";
import { useToast } from "@/hooks/use-toast";

export const useComment = () => {
  // const navigate = useNavigate();
  const { toast } = useToast();
  //   const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createComment(data),
    onSuccess: () => {
      toast({
        description: "Comment created successfully.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: error.response.data.message,
        description: " comment Failed,please try again",
      });
    },
  });
};
