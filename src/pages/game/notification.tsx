import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import Layout from '@/components/ui/shared/layout';

const mockNotifications = [
  {
    id: 1,
    type: 'all',
    user: {
      name: 'John Doe',
      username: 'johndoe',
      avatar: '/api/placeholder/32/32',
      initials: 'JD'
    },
    action: 'followed you',
    timestamp: '2m ago'
  },
  {
    id: 2,
    type: 'verified',
    user: {
      name: 'Sarah Wilson',
      username: 'sarahw',
      avatar: '/api/placeholder/32/32',
      initials: 'SW'
    },
    action: 'liked your post',
    timestamp: '5m ago'
  },
  {
    id: 3,
    type: 'mentions',
    user: {
      name: 'Alex Brown',
      username: 'alexb',
      avatar: '/api/placeholder/32/32',
      initials: 'AB'
    },
    action: 'mentioned you in a comment',
    timestamp: '10m ago'
  }
];

const NotificationItem = ({ notification }) => (
  <div className="flex items-start gap-4 p-4 hover:bg-accent transition-colors rounded-lg">
    <Avatar className="h-10 w-10">
      <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
      <AvatarFallback>{notification.user.initials}</AvatarFallback>
    </Avatar>
    <div className="flex flex-col space-y-1 ">
      <p className="text-sm">
        <span className="font-semibold">{notification.user.username}</span>
        {' '}{notification.action}
      </p>
      <p className="text-xs text-muted-foreground">
        {notification.timestamp}
      </p>
    </div>
  </div>
);

export default function NotificationsScreen() {
  return (
    <Layout>
    <div className="container max-w-2xl mx-auto  border h-screen">
      <div className="flex items-center justify-between mb-6">
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full grid grid-cols-3 p-0 bg-transparent h-12">
          <TabsTrigger 
            value="all" 
            className="w-full rounded-none data-[state=active]:bg-accent h-full"
          >
            All
          </TabsTrigger>
          <TabsTrigger 
            value="verified" 
            className="w-full rounded-none data-[state=active]:bg-accent h-full"
          >
            Invitations
          </TabsTrigger>
          <TabsTrigger 
            value="mentions" 
            className="w-full rounded-none data-[state=active]:bg-accent h-full border-l border-r border-border"
          >
            Mentions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-2 mt-6">
          {mockNotifications.map(notification => (
            <NotificationItem key={notification.id} notification={notification} />
          ))}
        </TabsContent>

        <TabsContent value="verified" className="space-y-2 mt-6">
          {mockNotifications
            .filter(n => n.type === 'verified')
            .map(notification => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
        </TabsContent>

        <TabsContent value="mentions" className="space-y-2 mt-6">
          {mockNotifications
            .filter(n => n.type === 'mentions')
            .map(notification => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
        </TabsContent>
      </Tabs>
    </div>
    </Layout>
  );
}