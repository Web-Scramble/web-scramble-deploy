import { useMutation } from "@tanstack/react-query";
import { ChallengeFormData } from "@/types/challenge";
// import { useNavigate } from "react-router";
import { useToast } from "@/hooks/use-toast";
import { updateUserProfile } from "@/services/user_api";

export const useEditUser = () => {
  const { toast } = useToast();
  //   const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: ChallengeFormData) => updateUserProfile(data),
    onSuccess: () => {
      toast({
        description: "profile updated successfully.",
      });
      //   navigate("/challenge");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: error.response.data.message,
        description:
          "profile update failed,verify your information and  try again",
      });
    },
  });
};
