import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/ui/shared/loader";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { setItemToLocalStorage } from "@/services/localStorage";
import { authStore } from "@/store/authstore";
import { useMutation } from "@tanstack/react-query";
import { UserCreationInputs } from "@/types/authentication";
import { userSchema } from "@/schema/account_creation_validation";
import { createUser } from "@/services/api";

const UsernameSetup = () => {
  const { phone } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { updateToken } = authStore();

  const handleUserCreation = (values: UserCreationInputs) => {
    createUserMutation.mutate({
      email: values.email,
      username: values.username,
      phone: phone,
    });

  };
  const createUserMutation = useMutation({
    mutationFn: createUser,
    mutationKey: ["CreateUSer"],
    onSuccess: (data) => {
      // Invalidate and refetch
      // queryClient.invalidateQueries({ queryKey: ['todos'] })
      toast({
        description: "OTP Verification successfull.",
      });
      if (data.message === "Registration successful") {
        setItemToLocalStorage("USER_DATA", data.user);
        updateToken(data.token);
        navigate(`/challenge`);
      } 
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: error.response.data.message,
        description: "please try again",
      });
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserCreationInputs>({
    resolver: yupResolver(userSchema),
  });
  const onSubmit: SubmitHandler<UserCreationInputs> = (data) =>
    handleUserCreation(data);
  console.log(watch("username"));
  console.log(watch("email"));

  if (createUserMutation.isPending) {
    <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Create your username
          </CardTitle>
          <CardDescription>
            Choose a unique username for your account. You can always change it
            later.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 flex flex-col gap-12"
          >
            <div className="space-y-2 flex flex-col items-start">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter username"
                className="w-full"
                {...register("username")}
              />
              <Label htmlFor="username" className="">
                email
              </Label>
              <Input
                id="username"
                type="email"
                placeholder="Enter username"
                className="w-full"
                {...register("email")}
              />
              {(errors.username || errors.email) && (
                <span className="text-red-500 text-xs">
                  {errors.username?.message || errors.email?.message}
                </span>
              )}
            </div>

            <Button type="submit" className="w-full">
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsernameSetup;
