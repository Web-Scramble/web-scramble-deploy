"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Share2,
  Plus,
  Clock,
  Lock,
  Unlock,
  Users,
  MoreVertical,
  Trophy,
  Vote,
  Flag,
  MessageSquare,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

  // Countdown timer hook
  const useCountdown = (initialTime) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
      const hrs = Math.floor(seconds / 3600);
      const mins = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      return `${hrs}h ${mins}m ${secs}s`;
    };

    return formatTime(timeLeft);
  };

const ChallengeFeed = () => {
  const challenges = [
    {
      id: 1,
      author: "Annette Black",
      username: "@annetteblack",
      prize: "$1,200",
      title: "Let's play the quantum game in a linear vibe",
      participants: 122,
      views: 10,
      timePosted: "2h ago",
      isPrivate: false,
      expiresIn: 172800, // 48 hours in seconds
    },
    // ... other challenges
  ];

 const timer  = useCountdown(20000)

  return (
    <div className="min-h-screen bg-background">
      <ScrollArea className="h-full">
        <div className="p-4 space-y-4 w-1/2 m-auto">
          {challenges.map((challenge) => (
            <Card key={challenge.id} className="relative">
              <CardContent className="pt-6">
                {/* Countdown Timer */}
                <div className="absolute top-2 right-4 flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Ends in: {timer}</span>
                </div>

                {/* Author Section */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="" />
                      <AvatarFallback>{challenge.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="font-semibold">{challenge.author}</div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">
                          {challenge.username}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          • {challenge.timePosted}
                        </span>
                        <span className="text-xs flex items-center gap-1">
                          {challenge.isPrivate ? (
                            <Lock className="h-3 w-3" />
                          ) : (
                            <Unlock className="h-3 w-3" />
                          )}
                          {challenge.isPrivate ? "Private" : "Public"}
                        </span>
                      </div>
                    </div>
                  </div>
                    <Link href={"boost-reward"}> 
                  <div className="flex items-center">
                    <span className="text-green-600 font-semibold text-lg">
                      {challenge.prize}
                    </span>
                    <div className="ml-2 h-5 w-5 rounded-full bg-green-600 flex items-center justify-center text-white text-xs">
                      +
                    </div>
                  </div>
                    </Link>
                </div>

                {/* Challenge Title */}
                <h3 className="text-lg font-semibold mb-4">
                  {challenge.title}
                </h3>
                <div className="flex justify-center">
                  <ScrollArea className="w-4/5 h-40 border rounded-sm p-2">
                    {"Let's play the quantum game in a linear vibe"}
                  </ScrollArea>
                </div>

                {/* Stats and Actions */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuLabel>Challenge Options</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Link
                            href="/game/leaderboard"
                            className="flex items-center"
                          >
                            <Trophy className="h-4 w-4 mr-2" />
                            Leaderboard
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link href={"/game/judge-panel"}>
                            <Vote className="h-4 w-4 mr-2" />
                            Vote
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Discussion
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Flag className="h-4 w-4 mr-2" />
                          Report
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <div className="flex items-center gap-1">
                    
                        <Button variant="ghost" size="icon">
                          <Users className="h-4 w-4" />
                        </Button>
                      <span>{challenge.participants}</span>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <Link href={"/game/submission"}>
                    <Button size="lg" className="px-8">
                      Join
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
          <Link href={"/game/create"}>
            <Button
              className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg"
              size="icon"
            >
              <Plus className="h-6 w-6" />
            </Button>
          </Link>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChallengeFeed;
