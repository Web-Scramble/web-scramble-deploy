import React, { useState } from "react";
import {
  Calendar,
  Timer,
  Plus,
  Image,
  Video,
  FileText,
  Users2,
  MessageCircle,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Link } from "react-router";
import { Challenge } from "@/types/challenge";
import RemarksSection from "./remarks";
import { BoostRewardModal } from "@/components/modals/amount_modal";
import { authStore } from "@/store/authstore";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router";
import { useComment } from "@/hooks/useComment";
import TiptapEditor from "@/components/ui/shared/tiptap_editor";
import { ShareDialog } from "@/components/dailogs/sharelink";


interface ChallengeContentProps {
  challenge: Challenge;
  onJoin?: () => void;
}

export const ChallengeContent: React.FC<ChallengeContentProps> = ({
  challenge,
  onJoin,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showRemarks, setShowRemarks] = useState(false);
  const [activeTab, setActiveTab] = useState<"comments" | "rankings">(
    "comments"
  );
  const [newComment, setNewComment] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);

  const { toast } = useToast();
  const { user } = authStore();
  const navigate = useNavigate();
  const {
    mutate: commentMutate,
    isLoading,
    isError,
    isSuccess,
    data,
  } = useComment();

  const getAttachmentIcon = (type: string) => {
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
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    commentMutate({ body: newComment, id: challenge.id });
    setNewComment("");
  };

  return (
    <CardContent className="p-4 space-y-4">
      <BoostRewardModal
        isOpen={isVisible}
        onOpenChange={setIsVisible}
        onSubmit={(amount) => {
          if (parseInt(user.balance) <= amount) {
            toast({
              variant: "destructive",
              title: "Insufficient Balance, Please Top up your account",
              description: "please try again",
            });
            navigate("/profile");
          }
          setIsVisible(false);
        }}
      />
      {/* <div>
        <h4 className="font-bold text-left">{challenge.title}</h4>
        <p className="text-sm text-gray-600 mt-1 text-left">
          {isExpanded
            ? challenge.description
            : `${challenge.description.slice(0, 100)}...`}
          <span
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-500 ml-1 text-sm cursor-pointer"
          >
            {isExpanded ? "Show less" : "Read more"}
          </span>
        </p>
      </div> */}
      <TiptapEditor editorContent={challenge.description} disabled={true} />

      <div className="flex items-center justify-between space-x-4 text-sm text-gray-600">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {challenge.end_time && (
              <span>Ends on {new Date(challenge.end_time).toDateString()}</span>
            )}
          </div>
          <div className="flex items-center">
            <Timer className="w-4 h-4 mr-1" />
            <span className="flex flex-row gap-2">
              duration {challenge.duration_value} {challenge.duration_unit}{" "}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-green-500">${challenge.reward_pool}</span>
          <Button
            variant="ghost"
            size="sm"
            className="p-0"
            onClick={() => setIsVisible(true)}
          >
            <Plus className="w-4 h-4 text-green-500" />
          </Button>
        </div>
      </div>

      {challenge.documents.length > 0 && (
        <div className="border rounded-lg p-2 space-y-4">
          <h5 className="text-sm font-medium">
            Attachments ({challenge.documents.length})
          </h5>
          <div className="flex gap-2">
            {challenge.documents.map((attachment, index) => (
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
            <span>{challenge.participant_count}</span>
          </span>
          <button
            onClick={() => setShowRemarks(!showRemarks)}
            className="flex items-center space-x-2 text-gray-600"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Remarks</span>
          </button>
          {/* <Button variant="ghost" size="sm" className="p-0">
            <Rocket className="w-5 h-5 text-gray-600" />
          </Button> */}
          <Button
            variant="ghost"
            size="sm"
            className="p-0"
            onClick={() => setShowShareDialog(true)}
          >
            <Rocket className="w-5 h-5 text-gray-600" />
          </Button>
        </div>
        {/* <Link to={`/submission/${challenge.id}`}> */}
          <Button
            variant="outline"
            size="sm"
            className="text-green-500"
            onClick={onJoin}
          >
            Join
          </Button>
        {/* </Link> */}
      </div>

      {showRemarks && (
        <RemarksSection
          remarks={challenge.comments}
          rankings={challenge.rankings}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          newComment={newComment}
          setNewComment={setNewComment}
          handleSubmitComment={handleSubmitComment}
        />
      )}
      <ShareDialog
  isOpen={showShareDialog}
  onClose={() => setShowShareDialog(false)}
  challengeId={challenge.id}
  // link = {challenge.}
/>
    </CardContent>
  );
};
