import { useState } from "react";
import {
  X,
  PenLine,
  Paperclip,
  Clock,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Globe,
  Trophy,
  Lock,
  List,
  Code,
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
import Layout from '@/components/ui/shared/layout';
import { useNavigate } from "react-router";
import InvitationPopup from "@/components/modals/invitation_modat";

const ChallengeCreator = () => {
  const [challengeType, setChallengeType] = useState("task");
  const [isPrivate, setIsPrivate] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isScheduled, setIsScheduled] = useState(false);
  const [showInvitationModal, setShowInvitationModal] = useState(false);
  const [isTimeLimited, setIsTimeLimited] = useState(false)
  const [duration, setDuration] = useState({
    value: 1,
    unit: "hours",
  });
  const [textFormat, setTextFormat] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
    align: "left",
    color: "black",
    size: "normal",
  });
 const navigate = useNavigate()
  const handleFormatChange = (format) => {
    setTextFormat((prev) => ({
      ...prev,
      [format]: !prev[format],
    }));
  };

  const handleAlignmentChange = (alignment) => {
    setTextFormat((prev) => ({
      ...prev,
      align: alignment,
    }));
  };

  return (
    <Layout>
  {showInvitationModal && <InvitationPopup isOpen={showInvitationModal}
        onClose={() => setShowInvitationModal(false)}/>}
    <div className="bg-white w-full max-w-xl min-w-88 mx-auto p-3 rounded-lg shadow-md">
      {/* Header with Close Button */}
      <div className="flex justify-end">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => navigate(-1)}>
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

      {/* Content Editor */}
      <div className="mb-4 rounded-lg border">
        <div className="relative">
          <textarea
            placeholder="Write your challenge description..."
            className="w-full min-h-[120px] p-3 text-base resize-none border-none focus:outline-none rounded-t-lg"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{
              textAlign: textFormat.align,
              color: textFormat.color,
              fontWeight: textFormat.bold ? "bold" : "normal",
              fontStyle: textFormat.italic ? "italic" : "normal",
              textDecoration: `${textFormat.underline ? "underline" : ""} ${
                textFormat.strikethrough ? "line-through" : ""
              }`.trim(),
              fontSize:
                textFormat.size === "small"
                  ? "0.875rem"
                  : textFormat.size === "large"
                  ? "1.25rem"
                  : "1rem",
            }}
          />
        </div>

        {/* Editor Toolbar */}
        <div className="flex items-center justify-between border-t p-2">
          <div className="flex items-center space-x-1">
            {/* Text Formatting Group */}
            <div className="flex items-center border-r pr-1">
              <Button
                variant={textFormat.bold ? "secondary" : "ghost"}
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => handleFormatChange("bold")}
              >
                <span className="font-bold">B</span>
              </Button>
              <Button
                variant={textFormat.italic ? "secondary" : "ghost"}
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => handleFormatChange("italic")}
              >
                <span className="italic">I</span>
              </Button>
              <Button
                variant={textFormat.underline ? "secondary" : "ghost"}
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => handleFormatChange("underline")}
              >
                <span className="underline">U</span>
              </Button>
              <Button
                variant={textFormat.strikethrough ? "secondary" : "ghost"}
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => handleFormatChange("strikethrough")}
              >
                <span className="line-through">S</span>
              </Button>
            </div>

            {/* Alignment Group */}
            <div className="flex items-center border-r pr-1">
              <Button
                variant={textFormat.align === "left" ? "secondary" : "ghost"}
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => handleAlignmentChange("left")}
              >
                <AlignLeft className="h-4 w-4" />
              </Button>
              <Button
                variant={textFormat.align === "center" ? "secondary" : "ghost"}
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => handleAlignmentChange("center")}
              >
                <AlignCenter className="h-4 w-4" />
              </Button>
              <Button
                variant={textFormat.align === "right" ? "secondary" : "ghost"}
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => handleAlignmentChange("right")}
              >
                <AlignRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Lists and Code */}
            <div className="flex items-center">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <List className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Code className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Right-aligned upload button */}
          <div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Paperclip className="h-4 w-4" />
            </Button>
          </div>
        </div>
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

        <Label className="text-sm font-medium mb-2 block text-left">Time Limit</Label>
        <Switch
          checked={isTimeLimited}
          onCheckedChange={setIsTimeLimited}
        />
        </div>
      {isTimeLimited && <div className="mb-4">
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <Label className="text-xs text-gray-500 mb-1 text-left flex">Duration</Label>
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
            <Label className="text-xs text-gray-500 mb-1 pl-1 text-left flex">Unit</Label>
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
      </div>}

      {/* Reward */}
      <div className="mb-4">
        <Label className="text-xs text-gray-500 mb-1 text-left flex">Reward</Label>
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
        <Label className="text-xs text-gray-500 mb-1 text-left flex">Invite Judges</Label>
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
        <div className="flex items-center justify-between mb-2">
          <Label className="text-sm font-medium">Schedule for Later</Label>
          <Switch checked={isScheduled} onCheckedChange={setIsScheduled} />
        </div>

        {isScheduled && (
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div>
              <Label className="text-xs text-gray-500 mb-1">Start Time</Label>
              <Input type="datetime-local" className="h-9" />
            </div>
            <div>
              <Label className="text-xs text-gray-500 mb-1">End Time</Label>
              <Input type="datetime-local" className="h-9" />
            </div>
          </div>
        )}
      </div>

      {/* Create Button */}
      <Button className="w-full h-12 text-base font-medium bg-gray-900 hover:bg-gray-800" onClick={()=>setShowInvitationModal(true)}>
        {isScheduled ? "Schedule Challenge" : "Create Challenge Now"}
      </Button>
    </div>
    </Layout>
  );
};

export default ChallengeCreator;
