import { useMutation } from "@tanstack/react-query";
import { deleteChallenge } from "@/services/challenge_api";
import { useNavigate } from "react-router";
import { useToast } from "@/hooks/use-toast";

export const QUERY_KEY = ["DELETE_CHALLENGES"] as const;

export const useDeleteChallenges = () => {
  // const navigate = useNavigate();
  const { toast } = useToast();
  return useMutation({
    mutationFn: (data: string) => deleteChallenge(data),
    onSuccess: () => {
      toast({
        description: "challenge deleted successfully.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: error?.response.data.message,
        description: "failed to delete challenge,try again",
      });
    },
  });
};
