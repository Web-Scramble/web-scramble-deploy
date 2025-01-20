import { useMutation } from "@tanstack/react-query";
import { submitChallengeSolution } from "@/services/challenge_api";
import { ChallengeFormData } from "@/types/challenge";
import { useNavigate } from "react-router";
import { useToast } from "@/hooks/use-toast";



export const useSubmitChallenge = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: ChallengeFormData) => submitChallengeSolution(data),
    onSuccess: () => {
      toast({
        description: "Submission created successfully.",
      });
      navigate("/challenge");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: error.response.data.message,
        description: "submission failed,please try latter",
      });
    },
  });
};
