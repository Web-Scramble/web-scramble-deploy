import { useState } from "react";
import {
  PenLine,
  Clock,
  AlignLeft,
  Globe,
  Trophy,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Layout from "@/components/ui/shared/layout";
import { useNavigate } from "react-router";
import InvitationPopup from "@/components/modals/invitation_modal";
// import TiptapEditor from "@/components/ui/shared/tiptap";
import TiptapEditor from "@/components/ui/shared/tiptap_editor";
import { Paperclip, Image, Video, FileText, X } from 'lucide-react';

// Add to your component state

const ChallengeCreator = () => {
  const [attachments, setAttachments] = useState([]);
  const [challengeType, setChallengeType] = useState("task");
  const [isPrivate, setIsPrivate] = useState(true);
  const [title, setTitle] = useState("");
 
  const [isScheduled, setIsScheduled] = useState(false);
  const [showInvitationModal, setShowInvitationModal] = useState(false);
  const [isTimeLimited, setIsTimeLimited] = useState(false);
  const [duration, setDuration] = useState({
    value: 1,
    unit: "hours",
  });

  const navigate = useNavigate();


 

  return (
    <Layout>
      {showInvitationModal && (
        <InvitationPopup
          isOpen={showInvitationModal}
          onClose={() => setShowInvitationModal(false)}
        />
      )}
      <div className="bg-white w-full max-w-xl min-w-88 mx-auto p-3 rounded-lg shadow-md">
        {/* Header with Close Button */}
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => navigate(-1)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Title Input Field */}
        <div className="mb-4">
          <div className="relative flex flex-row justify-start gap-2 items-center">
            <PenLine className=" h-4 w-4 text-gray-400" />
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg font-normal border-none shadow-none focus-visible:ring-0 pl-8 px-2 py-1"
              placeholder="Enter challenge title..."
            />
          </div>
        </div>

        <TiptapEditor
        />
        <div className="mb-4">
  <Label className="text-sm font-medium mb-2 block text-left">
    Attachments
  </Label>
  
  {/* File Upload Area */}
  <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 mb-2">
    <div className="flex flex-col items-center justify-center gap-2">
      <Input
        type="file"
        multiple
        id="file-upload"
        className="hidden"
        onChange={(e) => {
          const files = Array.from(e.target.files || []);
          setAttachments((prev) => [
            ...prev,
            ...files.map((file,index) => ({
              id:index,
              file,
              type: file.type.split('/')[0],
              name: file.name,
              size: file.size,
            })),
          ]);
        }}
        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.mp4,.mov"
      />
      <label
        htmlFor="file-upload"
        className="cursor-pointer flex flex-col items-center"
      >
        <div className="bg-gray-50 rounded-full p-3 mb-2">
          <Paperclip className="h-6 w-6 text-gray-500" />
        </div>
        <p className="text-sm text-gray-600">
          Click to upload or drag and drop
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Support for documents, images, and videos
        </p>
      </label>
    </div>
  </div>

  {/* Attachment List */}
  {attachments.length > 0 && (
    <div className="space-y-2">
      {attachments.map((attachment) => (
        <div
          key={attachment.id}
          className="flex items-center justify-between bg-gray-50 rounded-lg p-2"
        >
          <div className="flex items-center gap-2">
            {attachment.type === 'image' && (
              <Image className="h-4 w-4 text-gray-500" />
            )}
            {attachment.type === 'video' && (
              <Video className="h-4 w-4 text-gray-500" />
            )}
            {attachment.type === 'application' && (
              <FileText className="h-4 w-4 text-gray-500" />
            )}
            <div className="flex flex-col">
              <span className="text-sm font-medium truncate max-w-[200px]">
                {attachment.name}
              </span>
              <span className="text-xs text-gray-500">
                {Math.round(attachment.size / 1024)} KB
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-gray-500 hover:text-red-500"
            onClick={() =>
              setAttachments((prev) =>
                prev.filter((item) => item.id !== attachment.id)
              )
            }
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  )}
</div>
        {/* Challenge Type Selection */}
        <div className="mb-4">
          <Label className="text-sm font-medium mb-2 block text-left">
            Select Challenge Type
          </Label>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={challengeType === "task" ? "default" : "outline"}
              size="sm"
              className="flex items-center gap-2"
              onClick={() => setChallengeType("task")}
            >
              <Clock className="h-4 w-4" />
              Task
            </Button>
            <Button
              variant={challengeType === "prize" ? "default" : "outline"}
              size="sm"
              className="flex items-center gap-2"
              onClick={() => setChallengeType("prize")}
            >
              <Trophy className="h-4 w-4" />
              Prize Challenge
            </Button>

            <Button
              variant={challengeType === "blog" ? "default" : "outline"}
              size="sm"
              className="flex items-center gap-2"
              onClick={() => setChallengeType("blog")}
            >
              <AlignLeft className="h-4 w-4" />
              Blog
            </Button>
          </div>
        </div>

        {/* Duration Settings */}
        <div className="flex items-center justify-between mb-2">
          <Label className="text-sm font-medium mb-2 block text-left">
            Time Limit
          </Label>
          <Switch checked={isTimeLimited} onCheckedChange={setIsTimeLimited} />
        </div>
        {isTimeLimited && (
          <div className="mb-4">
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <Label className="text-xs text-gray-500 mb-1 text-left flex">
                  Duration
                </Label>
                <Input
                  type="number"
                  min="1"
                  value={duration.value}
                  onChange={(e) =>
                    setDuration((prev) => ({
                      ...prev,
                      value: parseInt(e.target.value),
                    }))
                  }
                  className="h-9"
                />
              </div>
              <div className="flex-1">
                <Label className="text-xs text-gray-500 mb-1 pl-1 text-left flex">
                  Unit
                </Label>
                <Select
                  value={duration.unit}
                  onValueChange={(value) =>
                    setDuration((prev) => ({ ...prev, unit: value }))
                  }
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minutes">Minutes</SelectItem>
                    <SelectItem value="hours">Hours</SelectItem>
                    <SelectItem value="days">Days</SelectItem>
                    <SelectItem value="weeks">Weeks</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Reward */}
        <div className="mb-4">
          <Label className="text-xs text-gray-500 mb-1 text-left flex">
            Reward
          </Label>
          <Input type="text" placeholder="Enter prize" className="h-9" />
        </div>

        {/* Privacy Toggle */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {isPrivate ? (
              <>
                <Lock className="h-4 w-4" />
                <span className="text-sm">Invite Only</span>
              </>
            ) : (
              <>
                <Globe className="h-4 w-4" />
                <span className="text-sm">Public Challenge</span>
              </>
            )}
          </div>
          <Switch
            checked={!isPrivate}
            onCheckedChange={(checked) => setIsPrivate(!checked)}
          />
        </div>

        {/* Participant Invitation */}
        {isPrivate && (
          <div className="mb-4">
            <Label className="text-xs text-gray-500 mb-1 text-left flex">
              Invite Participants
            </Label>
            <div className="flex gap-2">
              <Input
                placeholder="Enter participant names"
                className="h-9 flex-1"
                type="text"
              />
            </div>
          </div>
        )}

        {/* Judge Invitation */}
        <div className="mb-4">
          <Label className="text-xs text-gray-500 mb-1 text-left flex">
            Invite Judges
          </Label>
          <div className="flex gap-2">
            <Input
              placeholder="Enter judge names"
              className="h-9 flex-1"
              type="text"
            />
          </div>
        </div>

        {/* Schedule Toggle */}
        <div className="mb-4">
          <div className="flex flex-row items-center gap-4 ">
            <div>
              <Label className="text-xs text-gray-500 ">Start Time</Label>
              <Input type="datetime-local" className="h-9" />
            </div>
            <div className="flex items-center justify-end gap-4 mt-2 w-full ">
              <Label className="text-sm font-medium">Schedule for Later</Label>
              <Switch checked={isScheduled} onCheckedChange={setIsScheduled} />
            </div>
          </div>

          {isScheduled && (
            <div className="grid grid-cols-2 gap-3 mt-2">
              <div>
                <Label className="text-xs text-gray-500 mb-1">End Time</Label>
                <Input type="datetime-local" className="h-9" />
              </div>
            </div>
          )}
        </div>

        {/* Create Button */}
        <Button
          className="w-full h-12 text-base font-medium bg-gray-900 hover:bg-gray-800"
          onClick={() => setShowInvitationModal(true)}
        >
          {isScheduled ? "Schedule Challenge" : "Create Challenge Now"}
        </Button>
      </div>
    </Layout>
  );
};

export default ChallengeCreator;
