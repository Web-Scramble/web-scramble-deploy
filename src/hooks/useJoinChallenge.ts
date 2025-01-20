import { useMutation } from "@tanstack/react-query";
import { joinChallenge } from "@/services/challenge_api";
import { ChallengeFormData } from "@/types/challenge";
import { useNavigate } from "react-router";
import { useToast } from "@/hooks/use-toast";

export const useJoinChallenge = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  //   const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => joinChallenge(id),
    onSuccess: (data) => {
      toast({
        description: "challenge joined successfully.",
      });
      navigate("/submission");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: error.response.data.message,
        description: " failed to join challenges",
      });
    },
  });
};
