import {
  MoreVertical,
  Edit2,
  UserPlus,
  Trophy,
  Square,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CardHeader } from "@/components/ui/card";
import { Link } from "react-router";
import InvitationPopup from "@/components/modals/invitation_modal";
import { useState } from "react";
import { authStore } from "@/store/authstore";
import DemoReportModal from "@/components/modals/report_modal";

type ChallengeStatus =
  | "active"
  | "completed"
  | "upcoming"
  | "draft"
  | "reviewing";

interface ChallengeHeaderProps {
  name: string;
  avatar: string;
  id: string;
  challengeId:string;
  userId: string;
  status?: ChallengeStatus;
  onEdit?: () => void;
  onDelete?: () => void;
}

const getStatusStyles = (status: ChallengeStatus = "active") => {
  const styles = {
    active: "bg-green-100 text-green-800",
    completed: "bg-gray-100 text-gray-800",
    upcoming: "bg-blue-100 text-blue-800",
    draft: "bg-yellow-100 text-yellow-800",
    reviewing: "bg-purple-100 text-purple-800",
  };

  return styles[status];
};

const getStatusLabel = (status: ChallengeStatus = "active") => {
  const labels = {
    active: "Active",
    completed: "Completed",
    upcoming: "Upcoming",
    draft: "Draft",
    reviewing: "Under Review",
  };

  return labels[status];
};

export const ChallengeHeader = ({
  name,
  avatar,
  id,
  userId,
  status = "active",
  challengeId,
  onEdit,
  onDelete,
}: ChallengeHeaderProps) => {
  const [showInvitationModal, setShowInvitationModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  return (
    <CardHeader className="space-y-1 p-4">
      {showReportModal && (
        <DemoReportModal
          isOpen={showReportModal}
          onClose={() => setShowReportModal(false)}
        />
      )}
      {showInvitationModal && (
        <InvitationPopup
          isOpen={showInvitationModal}
          onClose={() => setShowInvitationModal(false)}
          judgeLink=""
          participantLink=""
        />
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link to={"/public-profile"}>
            <Avatar>
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback>{"PR"}</AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex flex-row gap-1">
            <h3 className="font-semibold">{name}</h3>
            <div
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(
                status
              )}`}
            >
              {getStatusLabel(status)}
            </div>
          </div>
        </div>
        {id === userId && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <Link to={`/edit-challenge/${challengeId}`}>
                <DropdownMenuItem onClick={onEdit} className="text-gray-500">
                  <Edit2 className="w-4 h-4 mr-2" /> Edit Challenge
                </DropdownMenuItem>
              </Link>

              <DropdownMenuItem onClick={() => setShowInvitationModal(true)}>
                <UserPlus className="w-4 h-4 mr-2" /> External invites
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowReportModal(true)}>
                <UserPlus className="w-4 h-4 mr-2" /> Report Challenge
              </DropdownMenuItem>
              <Link to="/review-panel">
                <DropdownMenuItem className="text-gray-500">
                  <Square className="w-4 h-4 mr-2" /> Vote
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={onDelete}
                className="text-red-600"
                disabled={status === "completed"}
              >
                <Trash2 className="w-4 h-4 mr-2" /> Delete Challenge
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </CardHeader>
  );
};
