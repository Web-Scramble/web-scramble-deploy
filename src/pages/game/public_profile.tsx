import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Settings,
  Edit,
  Calendar,
  MapPin,
  AtSign,
  Link as LinkIcon,
  DollarSign,
  Plus
} from "lucide-react";
import Layout from "@/components/ui/shared/layout";
import { Link } from "react-router";
import { authStore } from "@/store/authstore";
import { useParams } from "react-router"
import { getUserById } from "@/services/user_api";
import { ScreenLoader } from "@/components/ui/shared/screen_loader";
import { useGetUserById } from "@/hooks/useGetUserById";
import { useUnFollow } from "@/hooks/useUnfollow";
import { useFollow } from "@/hooks/useFollow";

const PublicProfile = () => {
  const recentActivities = [
    {
      type: "win",
      challenge: "Quantum Computing Challenge",
      date: "2 days ago",
      prize: "$500",
    },
    {
      type: "participate",
      challenge: "AI Ethics Debate",
      date: "1 week ago",
      prize: "$200",
    },
    {
      type: "create",
      challenge: "Blockchain Innovation",
      date: "2 weeks ago",
      prize: "$750",
    },
  ];
  const {userId} = useParams()
  const { user } = authStore();
  const {getUser,isLoading,} = useGetUserById(userId as string)

  if(getUser)(
    console.log(getUser)
  )

  return (
    <Layout>
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Header */}
          <div className="relative">
            {/* Cover Image */}
            <div className="h-48 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500" />

            {/* Profile Info */}
            <div className="absolute -bottom-10 left-6 flex md:items-end space-x-4 flex-col items-center">
              <Avatar className=" h-24 md:h-32 w-24 md:w-32  border-background">
                <AvatarImage src={user.profile_picture} />
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>
              <div className="mb-4 space-y-1">
                <h1 className="text-2xl font-bold text-white">
                  {user.username}
                </h1>
                <p className="text-white/90">@{user.username}</p>
              </div>
            </div>

            {/* Actions */}
            {/* <div className="absolute right-6 bottom-4 flex space-x-2">
              <Link to="/edit-profile">
                <Button size="sm" variant="secondary">
                  <Edit className="h-4 w-4 mr-2 " />
                  <span className="hidden md:flex">Edit Profile</span>
                </Button>
              </Link>
              <Link to="/settings">
                <Button size="sm" variant="secondary">
                  <Settings className="h-4 w-4" />
                </Button>
              </Link>
            </div> */}
          </div>

          {/* Profile Content */}
          <div className="mt-20 grid gap-6 mr-8">
            {/* Bio and Info */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex  gap-2 text-sm items-center text-muted-foreground">
                    <div className="flex items-center gap-2 md:text-base text-xs">
                      Joined on March 2024
                    </div>
                    <div className="flex items-center gap-2 text-xs md:text-base">
                      <span className="font-bold text-xs md:text-base">1k</span> followers
                    </div>
                    <div className="flex items-center gap-2 text-xs md:text-base">
                    <span className="font-bold text-xs md:text-base">234</span> following
                    </div>
                    <Button variant={"ghost"} className="flex items-center md:text-base">
                        <Plus className="h-4 w-4"/>
                        Follow
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activity Tabs */}
            <Tabs defaultValue="recent">
              <TabsList>
                {/* <TabsTrigger value="recent">Recent Activity</TabsTrigger> */}
                <TabsTrigger value="challenges">Challenges</TabsTrigger>
                <TabsTrigger value="submissions">Submissions</TabsTrigger>
              </TabsList>
              {/* <TabsContent value="recent">
                <Card>
                  <ScrollArea className="h-[400px]">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        {recentActivities.map((activity, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between border-b pb-4 last:border-0"
                          >
                            <div>
                              <h3 className="font-medium">
                                {activity.challenge}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {activity.type === "win"
                                  ? "🏆 Won"
                                  : activity.type === "participate"
                                  ? "👥 Participated"
                                  : "✍️ Created"}{" "}
                                - {activity.date}
                              </p>
                            </div>
                            <div className="text-green-600 font-semibold">
                              {activity.prize}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </ScrollArea>
                </Card>
              </TabsContent> */}
              <TabsContent value="challenges">
                {/* Challenges content */}
              </TabsContent>
              <TabsContent value="submissions">
                {/* Submissions content */}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PublicProfile;
