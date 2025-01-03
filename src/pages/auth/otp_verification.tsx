import React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { ValidateOtp } from "@/services/api";
import { otpSchema } from "@/schema/otp_validation";
import { useForm, SubmitHandler } from "react-hook-form";
import { ValidateInputs } from "@/types/authentication";
import { yupResolver } from "@hookform/resolvers/yup";
import { useToast } from "@/hooks/use-toast";
import { sendOtp } from "@/services/api";
import { LoadingSpinner } from "@/components/ui/shared/loader";
import { useParams } from "react-router";


const OTPVerification = () => {
const { phone } = useParams();
  const { toast } = useToast();
  const validateOtpMutation = useMutation({
    mutationFn: ValidateOtp,
    mutationKey: ["ValidateOTP"],
    onSuccess: () => {
      // Invalidate and refetch
      // queryClient.invalidateQueries({ queryKey: ['todos'] })
      toast({
        description: "OTP Verification successfull.",
      });
      // navigate(`/otp/${phone}`)
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Otp not sent,try again",
        description: error.message,
      });
    }
  });
  const sendOtpMutation = useMutation({
    mutationFn: sendOtp,
    mutationKey: ["sendOtp"],
    onSuccess: () => {
      // Invalidate and refetch
      // queryClient.invalidateQueries({ queryKey: ['todos'] })
      toast({
        description: "OTP sent",
      });
      // navigate(`/otp/${phone}`)
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: " failed to resend OTP",
        description: error.message,
      });
    }
  });

  const handleOtpVerification = (values: ValidateInputs) => {
    console.log(values.otp,phone)
    validateOtpMutation.mutate({
      phone,otp: values.otp
    });
  };
  // const handleRefetch = () => {
  // };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ValidateInputs>({
    resolver: yupResolver(otpSchema),
  });
  const onSubmit: SubmitHandler<ValidateInputs> = (data) => handleOtpVerification(data);
  console.log(watch("otp"));

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Check your email/phone messages
          </CardTitle>
          <CardDescription className="text-base">
            We sent a verification code to your email. Enter the code below to
            continue.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {sendOtpMutation.isPending && <LoadingSpinner /> }
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 text-center flex flex-col items-center"
          >
            <div className="space-y-2">
              <InputOTP maxLength={6} {...register("otp")}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              {errors.otp && (
                <span className="text-red-500 text-xs">
                  {errors.otp?.message}
                </span>
              )}
              <div className="flex items-center justify-between text-sm mt-4">
                <div className="flex items-center text-muted-foreground"></div>
              </div>
            </div>
            <Button
              variant="link"
              className="p-0 h-auto text-primary hover:text-primary/80"
            >
              Resend code
            </Button>
            <Button type="submit" className="w-full">
              Verify
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          {/* <Button variant="link" className="text-sm text-muted-foreground">
            ← Back to sign in
          </Button> */}
        </CardFooter>
      </Card>
    </div>
  );
};

export default OTPVerification;
