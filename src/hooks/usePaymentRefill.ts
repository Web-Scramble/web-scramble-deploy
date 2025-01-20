import { useMutation } from "@tanstack/react-query";
import { createChallenge } from "@/services/challenge_api";
import { ChallengeFormData } from "@/types/challenge";
import { useNavigate } from "react-router";
import { useToast } from "@/hooks/use-toast";

export const useCreateChallenge = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: ChallengeFormData) => createChallenge(data),
    onSuccess: () => {
      toast({
        description: "refill sucessfull.",
      });
      navigate("/challenge");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: error.response.data.message,
        description: "please try again",
      });
    },
  });
};
