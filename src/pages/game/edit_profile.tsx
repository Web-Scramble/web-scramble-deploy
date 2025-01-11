import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Camera, LockIcon, PencilIcon, ImageIcon } from "lucide-react";
import { authStore } from '@/store/authstore';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    username: 'Annete Black',
    email: 'annete@example.com',
    phone: '+1 234 567 8900',
    avatar: '/api/placeholder/100/100',
    backgroundImage: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };
  const {user} = authStore()

  return (
    <div className="container max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Profile Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Background Image Upload */}
            <div className="relative rounded-lg overflow-hidden bg-gray-50">
              <div className="aspect-[3/1] bg-muted relative group flex justify-center items-center right-0">
              { formData.backgroundImage && <img 
                  src={formData.backgroundImage} 
                  alt="Background" 
                  className="w-full h-full object-cover"
                />}
                  <Camera className="h-10 w-10 text-gray-500" />

                {/* <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button variant="secondary" size="icon" className="rounded-full">
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                </div> */}
              </div>
            </div>

            {/* Avatar Upload Section */}
            <div className="flex flex-col items-center -mt-12">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-background">
                  <AvatarImage src={formData.avatar} alt="Profile" />
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute bottom-0 right-0 rounded-full"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4 mt-6">
              <div className="relative">
                <Input
                  id="username"
                  name="username"
                  value={user.username}
                  onChange={handleInputChange}
                  placeholder="Username"
                  className="pr-10"
                />
                <PencilIcon className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              </div>
            <div className="flex flex-col md:flex-row justify-center gap-8">

              <div className="relative w-full">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={user.email}
                  placeholder="Email"
                  className="bg-muted cursor-not-allowed pr-10"
                  disabled
                />
                <LockIcon className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              </div>

              <div className="relative w-full">
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={user.phone}
                  placeholder="Phone"
                  className="bg-muted cursor-not-allowed pr-10"
                  disabled
                />
                <LockIcon className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
            </div>


            {/* Submit Button */}
            <div className="flex justify-end">
              <Button type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProfile;