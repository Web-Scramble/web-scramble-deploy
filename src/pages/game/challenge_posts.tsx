import React, { useState } from "react";
import {
  Trophy,
  Clock,
  Timer,
  Share,
  Plus,
  ChevronRight,
  Calendar,
  MoreVertical,
  Edit2,
  Trash2,
  UserPlus,
  Image,
  Video,
  FileText,
  Users2,
  MessageCircle,
  Square,
  Send,
  CheckSquare,
  Play,
  ThumbsUp,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router";

const GameChallenge = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showRemarks, setShowRemarks] = useState(false);
  const [activeTab, setActiveTab] = useState("comments");
  const [newComment, setNewComment] = useState("");

  const attachments = [
    { type: "image", name: "Game Rules.png" },
    { type: "video", name: "Tutorial.mp4" },
    { type: "document", name: "Instructions.pdf" },
  ];

  const remarks = [
    {
      id: 1,
      user: "Alice Cooper",
      avatar: "AC",
      content:
        "This challenge looks interesting! I particularly like how it combines quantum mechanics with game theory.",
      timestamp: "2h ago",
      likes: 12,
    },
    {
      id: 2,
      user: "Bob Wilson",
      avatar: "BW",
      content:
        "Looking forward to participating. The reward pool is quite attractive!",
      timestamp: "1h ago",
      likes: 8,
    },
  ];

  const rankings = [
    {
      rank: 1,
      user: "Sara S.",
      score: 1000,
      remarks: [
        {
          id: 1,
          text: "Outstanding system architecture design",
          date: "2024-12-27",
        },
        { id: 2, text: "Excellent problem-solving skills", date: "2024-12-26" },
      ],
    },
    {
      rank: 2,
      user: "James C.",
      score: 800,
      remarks: [
        {
          id: 1,
          text: "Innovative performance optimization",
          date: "2024-12-27",
        },
      ],
    },
    {
      rank: 3,
      user: "Alex K.",
      score: 750,
      remarks: [
        { id: 1, text: "Strong code quality improvements", date: "2024-12-25" },
      ],
    },
    {
      rank: 4,
      user: "Emma W.",
      score: 720,
      remarks: [
        { id: 1, text: "Exceptional project delivery", date: "2024-12-24" },
      ],
    },
    {
      rank: 5,
      user: "David P.",
      score: 680,
      remarks: [
        { id: 1, text: "Great technical leadership", date: "2024-12-23" },
      ],
    },
  ];

  const getAttachmentIcon = (type) => {
    switch (type) {
      case "image":
        return <Image className="w-4 h-4" />;
      case "video":
        return <Video className="w-4 h-4" />;
      case "document":
        return <FileText className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setNewComment("");
  };

  return (
    // <Card className="w-full max-w-xl mx-auto bg-white shadow-lg">
    <Card className="w-full max-w-xl mx-auto bg-white shadow-lg">
      <CardHeader className="space-y-1 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src="/api/placeholder/32/32" alt="Profile" />
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">Annette Black</h3>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <Edit2 className="w-4 h-4 mr-2" /> Edit Challenge
              </DropdownMenuItem>
              <DropdownMenuItem>
                <UserPlus className="w-4 h-4 mr-2" /> Invite Participants
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Trophy className="w-4 h-4 mr-2" /> Add Judges
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Square className="w-4 h-4 mr-2" /> Vote
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="w-4 h-4 mr-2" /> Delete Challenge
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        <div>
          <h4 className="font-medium">Quantum Linear Game Challenge</h4>
          <p className="text-sm text-gray-600 mt-1">
            {isExpanded
              ? "Let's play the quantum game in a linear vibe. This challenge tests your understanding of quantum mechanics principles in a game format. Players need to complete various levels with increasing difficulty."
              : "Let's play the quantum game in a linear vibe..."}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-500 ml-1 text-sm"
            >
              {isExpanded ? "Show less" : "Read more"}
            </button>
          </p>
        </div>

        <div className="flex items-center justify-between space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span>Ends in 2d 14h</span>
            </div>
            <div className="flex items-center">
              <Timer className="w-4 h-4 mr-1" />
              <span>45min duration</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-500">$1,200</span>
            <Button variant="ghost" size="sm" className="p-0">
              <Plus className="w-4 h-4 text-green-500" />
            </Button>
          </div>
        </div>

        {attachments.length > 0 && (
          <div className="border rounded-lg p-2 space-y-4">
            <h5 className="text-sm font-medium">
              Attachments ({attachments.length})
            </h5>
            {/* Preview for first attachment */}
            {attachments[0].type === "image" && (
              <div className="relative">
                <img
                  src="/api/placeholder/300/150"
                  alt="Game Rules"
                  className="w-full h-32 object-cover rounded-md bg-gray-100"
                />
                <p className="text-sm text-gray-600 mt-1">Rules</p>
              </div>
            )}
            {attachments[0].type === "video" && (
              <div>
                <div className="relative w-full h-32 bg-gray-100 rounded-md flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center">
                      <Play className="w-6 h-6 text-gray-700" />
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-1">Tutorial</p>
              </div>
            )}
            {attachments[0].type === "document" && (
              <div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm text-gray-600">Preview first page</p>
                </div>
                <p className="text-sm text-gray-600 mt-1">Instructions</p>
              </div>
            )}

            {/* Attachment list */}
            <div className="flex gap-2">
              {attachments.map((attachment, index) => (
                <div
                  key={index}
                  className="flex items-center p-2 bg-gray-50 rounded-md"
                >
                  {getAttachmentIcon(attachment.type)}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-2 text-gray-600">
              <Users2 className="w-5 h-5" />
              <span>122</span>
            </span>
            <button
              onClick={() => setShowRemarks(!showRemarks)}
              className="flex items-center space-x-2 text-gray-600"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Remarks</span>
            </button>
            <Button variant="ghost" size="sm" className="p-0">
              <Rocket className="w-5 h-5 text-gray-600" />
            </Button>
          </div>
          <Button variant="outline" size="sm" className="text-green-500">
            Join
          </Button>
        </div>

        {showRemarks && (
          <div className="mt-4 border rounded-lg p-4">
            <div className="flex justify-between items-center mb-4 border-b">
              <div className="flex space-x-4">
                <button
                  onClick={() => setActiveTab("comments")}
                  className={`pb-2 px-4 ${
                    activeTab === "comments"
                      ? "border-b-2 border-gray-900 font-medium"
                      : "text-gray-500"
                  }`}
                >
                  Comments
                </button>
                <button
                  onClick={() => setActiveTab("rankings")}
                  className={`pb-2 px-4 ${
                    activeTab === "rankings"
                      ? "border-b-2 border-gray-900 font-medium"
                      : "text-gray-500"
                  }`}
                >
                  Rankings
                </button>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
                onClick={() => {}}
              >
                <Square className="w-4 h-4" />
                <span>Vote</span>
              </Button>
            </div>

            {activeTab === "comments" && (
              <div className="space-y-4">
                {remarks.map((remark) => (
                  <div key={remark.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>{remark.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{remark.user}</span>
                          <span className="text-sm text-gray-500">
                            {remark.timestamp}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {remark.content}
                        </p>
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <button className="flex items-center space-x-1 hover:text-gray-900">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{remark.likes}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <form
                  onSubmit={handleSubmitComment}
                  className="flex items-center space-x-2 mt-4"
                >
                  <Input
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-1"
                  />
                  <Button type="submit" size="sm">
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            )}

            {activeTab === "rankings" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-center">
                  Top 5 Players
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={rankings}
                      margin={{ top: 10, right: 30, left: 80, bottom: 20 }}
                      layout="vertical"
                      barSize={20}
                    >
                      <XAxis
                        type="number"
                        axisLine={{ stroke: "#e5e7eb" }}
                        tick={{ fontSize: 12 }}
                        label={{
                          value: "Score",
                          position: "bottom",
                          offset: 0,
                        }}
                      />
                      <YAxis
                        type="category"
                        dataKey="user"
                        axisLine={true}
                        tick={{ fontSize: 12 }}
                        width={80}
                        label={{
                          value: "Players",
                          angle: -90,
                          position: "left",
                          offset: 20,
                        }}
                        onClick={(data) => {
                          if (data && data.index !== undefined) {
                            const person = rankings[data.index];
                            document
                              .getElementById(`remarks-trigger-${person.rank}`)
                              .click();
                          }
                        }}
                      />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-background border rounded-lg shadow-lg p-2 text-xs">
                                <p className="font-medium">
                                  {payload[0].payload.user}
                                </p>
                                <p className="text-muted-foreground">
                                  {payload[0].value} points
                                </p>
                                <p className="text-blue-500 text-xs mt-1">
                                  Click name to view remarks
                                </p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar
                        dataKey="score"
                        fill="#93c5fd"
                        radius={[0, 4, 4, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {rankings.map((person) => (
                  <Dialog key={person.rank}>
                    <DialogTrigger
                      id={`remarks-trigger-${person.rank}`}
                      className="hidden"
                    />
                    <DialogContent className="sm:max-w-lg">
                      <DialogHeader>
                        <DialogTitle className="flex items-center justify-between">
                          <span>{person.user}</span>
                          <Badge variant="secondary">{person.score}</Badge>
                        </DialogTitle>
                      </DialogHeader>
                      <ScrollArea className="max-h-[60vh]">
                        <div className="space-y-4 pr-4">
                          {person.remarks.map((remark) => (
                            <div
                              key={remark.id}
                              className="p-4 bg-secondary/20 rounded-lg space-y-2"
                            >
                              <p className="text-sm text-foreground/80">
                                {remark.text}
                              </p>
                              <time className="text-xs text-muted-foreground">
                                {remark.date}
                              </time>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4">
        <Link to={"/create"}>
          <Button
            className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg"
            size="icon"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default GameChallenge;
