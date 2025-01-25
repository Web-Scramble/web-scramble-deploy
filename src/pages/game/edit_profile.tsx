import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Camera, LockIcon, PencilIcon, ImageIcon } from "lucide-react";
import { authStore } from '@/store/authstore';
import { useEditUser } from '@/hooks/useEditUser';
import { User } from '@/types/authentication';

const schema = yup.object({
  username: yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must not exceed 20 characters')
    .required('Username is required'),
  avatar: yup.mixed(),
  backgroundImage: yup.mixed(),
}).required();

const EditProfile = () => {
  const { user } = authStore();
    const {
      mutate:editUserMutate,
      isLoading,
    } = useEditUser();
  
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: user.username,
      avatar: user.profile_picture,
      backgroundImage: user.backgroundImage
    }
  });

  const onSubmit = (data:User) => {
    const userdata = {
      ...data,
      id:user.id,
      username:data.username,
      email:user.email,
      password:"bla bla bla"
    }
    editUserMutate(userdata)
  };

  // const handleImageUpload = (event, field) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setValue(field, reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  return (
    <div className="container max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Profile Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="relative rounded-lg overflow-hidden bg-gray-50">
              <div className="aspect-[3/1] bg-muted relative group flex justify-center items-center">
                <input
                  type="file"
                  accept="image/*"
                  {...register('backgroundImage')}
                  onChange={(e) => handleImageUpload(e, 'backgroundImage')}
                  className="hidden"
                  id="backgroundImage"
                />
                {user.backgroundImage && (
                  <img
                    src={user.backgroundImage}
                    alt="Background"
                    className="w-full h-full object-cover"
                  />
                )}
                <label htmlFor="backgroundImage" className="cursor-pointer">
                  <Camera className="h-10 w-10 text-gray-500" />
                </label>
              </div>
            </div>

            <div className="flex flex-col items-center -mt-12">
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  {...register('avatar')}
                  onChange={(e) => handleImageUpload(e, 'avatar')}
                  className="hidden"
                  id="avatar"
                />
                <Avatar className="h-24 w-24 border-4 border-background">
                  <AvatarImage src={user.avatar} alt="Profile" />
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
                <label htmlFor="avatar">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute bottom-0 right-0 rounded-full"
                    type="button"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </label>
              </div>
            </div>

            <div className="space-y-4 mt-6">
              <div className="relative">
                <Input
                  {...register('username')}
                  placeholder="Username"
                  className={`pr-10 ${errors.username ? 'border-red-500' : ''}`}
                />
                <PencilIcon className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
                )}
              </div>

              <div className="flex flex-col md:flex-row justify-center gap-8">
                <div className="relative w-full">
                  <Input
                    value={user.email}
                    placeholder="Email"
                    className="bg-muted cursor-not-allowed pr-10"
                    disabled
                  />
                  <LockIcon className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                </div>

                <div className="relative w-full">
                  <Input
                    value={user.phone}
                    placeholder="Phone"
                    className="bg-muted cursor-not-allowed pr-10"
                    disabled
                  />
                  <LockIcon className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProfile;