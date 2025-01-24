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
import { ShareDialog } from "@/components/dailogs/sharelink"
import { cn } from "@/lib/utils"
import { useChallenges } from "@/hooks/useChallenges";


// import { FileText } from "lucide-react";
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
  const {refetch} = useChallenges()
  const {
    mutate: commentMutate,
    isLoading,
    isError,
    isSuccess,
    data,
  } = useComment();
  interface AttachmentPreviewProps {
    type: string;
    url?: string;
  }
  
  const AttachmentPreview = ({ type, url = "https://lh3.googleusercontent.com/a/ACg8ocKXDTXM8_NnxUlD2Vhny-ASCdCweJ7v_r21QtgsIvjVESPvLg=s96-c" }) => {
    const previewClasses = "w-16 h-16 rounded-md object-cover";
    
    if (type === "image") {
      return (
        <div className="relative group">
          <img 
            src={url} 
            alt="attachment" 
            className={cn(previewClasses, "hover:opacity-90 transition-opacity")}
          />
        </div>
      );
    }
    
    if (type === "video") {
      return (
        <div className="relative group">
          <video 
            src={url}
            className={previewClasses}
            controls={false}
          >
            <source src={url} type="video/mp4" />
          </video>
        </div>
      );
    }
    
    return (
      <div className={cn(previewClasses, "bg-gray-100 flex items-center justify-center")}>
        <FileText className="w-8 h-8 text-gray-500" />
      </div>
    );
  };
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
    commentMutate({ body: newComment, id: challenge.id },{
      onSuccess(){
        refetch()
      }
    });
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
    
      <TiptapEditor editorContent={challenge.description} disabled={true} setEditorContent={()=>console.log()}/>

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
            <span className="flex flex-row gap-2 capitalize">
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
  <div className=" rounded-lg p-2 space-y-4">
    <h5 className="text-sm font-medium">
      Attachments ({challenge.documents.length})
    </h5>
    <div className="flex gap-2">
      {challenge.documents.map((attachment, index) => (
        <AttachmentPreview 
          key={index}
          type={attachment.type}
          url={attachment.url}
        />
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
          challengeId={challenge.id}
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
