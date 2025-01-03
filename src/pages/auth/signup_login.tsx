import React,{useState} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { sendOtp } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { phoneSchema } from "@/schema/signup_validation_schema";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Inputs } from "@/types/authentication";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/ui/shared/loader";
import { useNavigate } from "react-router";

const AuthPage = () => {
const navigate = useNavigate();
const [phone, setPhone] = useState("")
  const sendOtpMutation = useMutation({
    mutationFn: sendOtp,
    mutationKey: ["sendOtp"],
    onSuccess: () => {
      // Invalidate and refetch
      // queryClient.invalidateQueries({ queryKey: ['todos'] })
      toast({
        description: "Your OTP has been sent.",
      });
      navigate(`/otp/${phone}`)
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Otp not sent,try again",
        description: error.message,
      });
    }
  });
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(phoneSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => handleOtpRequest(data);

  console.log(watch("phone"));

  const handleOtpRequest = (values: Inputs) => {
    setPhone(values.phone)
    sendOtpMutation.mutate(values);
  };



  if (sendOtpMutation.isPending) {
    <LoadingSpinner />;
  }
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Welcome back
          </CardTitle>
          <CardDescription>
            Enter your Email or Phone to sign in to your account or create your
            account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 flex flex-col gap-2"
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email/Phone</Label>
              <Input
                id="email"
                type="text"
                placeholder="name@example.com or +1 234 534 789"
                className="w-full"
                {...register("phone")}
              />
            </div>
            {errors.phone && (
              <span className="text-red-500 text-xs">
                {errors.phone?.message}
              </span>
            )}
            <Button type="submit" className="w-full">
              Continue with Email
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              "/images/google.png",
              "/images/apple.png",
              "/images/facebook.png",
            ].map((provider) => (
              <Button key={provider} variant="outline" className="w-full">
                {/* <div className="w-5 h-5 mr-2 bg-muted rounded-sm flex flex-row items-center justify-center"></div> */}
                <img src={provider} alt="google" width={25} height={25} />
                {/* <span className="sr-only">Continue with {provider}</span> */}
              </Button>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
          <span className="text-center">
            By continuing, you agree to our{" "}
            <Button variant="link" className="p-0 h-auto">
              Terms of Service
            </Button>{" "}
            and{" "}
            <Button variant="link" className="p-0 h-auto">
              Privacy Policy
            </Button>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthPage;