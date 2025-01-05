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
} from "lucide-react";
import Layout from "@/components/ui/shared/layout";
import { Link } from "react-router";

const ProfilePage = () => {
  const userStats = [
    { label: "Challenges Won", value: "32" },
    { label: "Total Points", value: "1,240" },
    { label: "Participations", value: "45" },
    { label: "Success Rate", value: "71%" },
  ];

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

  return (
    <Layout>
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Header */}
          <div className="relative">
            {/* Cover Image */}
            <div className="h-48 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500" />

            {/* Profile Info */}
            <div className="absolute -bottom-10 left-6 flex md:items-end space-x-4 flex-col items-center md:flex-row">
              <Avatar className="h-32 w-32 border-4 border-background">
                <AvatarImage src="" />
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>
              <div className="mb-4 space-y-1">
                <h1 className="text-2xl font-bold text-white">Annette Black</h1>
                <p className="text-white/90">@annetteblack</p>
              </div>
            </div>

            {/* Actions */}
            <div className="absolute right-6 bottom-4 flex space-x-2">
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
            </div>
          </div>

          {/* Profile Content */}
          <div className="mt-20 grid gap-6">
            {/* Bio and Info */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <p className="text-muted-foreground text-sm md:text-base">
                    Quantum computing enthusiast and challenge creator. Love to
                    solve complex problems and create engaging challenges for
                    the community.
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    {/* <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      San Francisco, CA
                    </div> */}
                    <div className="flex items-center">
                      <AtSign className="h-4 w-4 mr-1" />
                      ndeoswaldnji@gmail.com
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Joined March 2023
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>


            {/* Activity Tabs */}
            <Tabs defaultValue="recent">
              <TabsList>
                <TabsTrigger value="recent">Recent Activity</TabsTrigger>
                <TabsTrigger value="challenges">My Challenges</TabsTrigger>
                <TabsTrigger value="submissions">Submissions</TabsTrigger>
              </TabsList>
              <TabsContent value="recent">
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
              </TabsContent>
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

export default ProfilePage;
