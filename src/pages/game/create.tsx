import { useState, useEffect } from "react";
import { PenLine, Clock, AlignLeft, Globe, Trophy, Lock } from "lucide-react";
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
import TiptapEditor from "@/components/ui/shared/tiptap_editor";
import { Paperclip, Image, Video, FileText, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { challengeSchema } from "@/schema/challenge_creation_validation";
import { ChallengeFormData } from "@/types/challenge";
import { useCreateChallenge } from "@/hooks/useCreateChallenge";
import { searchUser } from "@/services/user";
import { useToast } from "@/hooks/use-toast";
import ParticipantDropdown from "@/components/features/challenge/add_participants";
import { DatePicker } from "@/components/ui/shared/calendar";
import {
  attachmentsUpload,
  attachmentsUploadWithProgress,
  attachmentUpload,
  uploadSingleFile,
} from "@/utils/imageUpload";
import { ScreenLoader } from "@/components/ui/shared/screen_loader";
import Editor from "@/components/editor/Editor";

const ChallengeCreator = () => {
  const [attachments, setAttachments] = useState([]);
  const [challengeType, setChallengeType] =
    useState<ChallengeFormData["challengeType"]>("task");
  const [isTimeLimited, setIsTimeLimited] = useState(false);
  const [isPrivate, setIsPrivate] = useState(true);
  const [reward, setReward] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);
  const [editorContent, setEditorContent] = useState(
    `this is a blank placeholder for editor content`
  );
  const [startDate, setStartdate] = useState<Date | undefined>(new Date());
  const [endDate, setEnddate] = useState<Date | undefined>(new Date());
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [selectedJudges, setSelectedJudges] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);

  const { toast } = useToast();

  const [showInvitationModal, setShowInvitationModal] = useState(false);
  const [duration, setDuration] = useState("hours");

  const navigate = useNavigate();
  const {
    handleSubmit,
    watch,
    formState: { errors },
    register,
    setValue,
  } = useForm<ChallengeFormData>({
    resolver: yupResolver(challengeSchema),
    defaultValues: {
      isPrivate: true,
      // isScheduled: false,
      duration_value: 1,
      duration_unit: "hours",
    },
  });

  useEffect(() => {
    setValue("challengeType", challengeType);
    setValue("description", editorContent);
  }, [editorContent]);
  const {
    mutate: createMutate,
    isLoading,
    isError,
    isSuccess,
    data,
  } = useCreateChallenge();
  useEffect(() => {
    if (data) {
      console.log(data);
      setShowInvitationModal(true);
    }
  }, [data]);
  const handleCreateChallenge = async (data: ChallengeFormData) => {
    try {
      setDataLoading(true);
      console.log(attachments);
      if (attachments.length > 0) {
        attachmentsUploadWithProgress(attachments).then(
          ({ urls, uploadedFiles }) => {
            console.log(uploadedFiles);
            const challengeData = {
              challengeType: challengeType,
              is_public: !isPrivate,
              reward_pool: data.reward,
              duration_value: data.duration_value,
              duration_unit: data.duration_unit,
              title: data.title,
              description: editorContent,
              documents: uploadedFiles,
              judges: [{ name: "pla" }, { name: "pla" }, { name: "pla" }],
              participants: [{ name: "pla" }, { name: "pla" }, { name: "pla" }],
              start_time: startDate,
              end_time: endDate,
            };
            console.log(challengeData);
            createMutate(challengeData, {
              onSettled(data, error) {
                setDataLoading(false);
                console.log(data);
              },
              onSuccess() {
                setShowInvitationModal(true);
              },
            });
          }
        );
        return;
      } else {
        const challengeData = {
          challengeType: challengeType,
          is_public: !isPrivate,
          reward_pool: !reward?null:data.reward,
          duration_value: data.duration_value,
          duration_unit: data.duration_unit,
          title: data.title,
          description: editorContent,
          documents: [],
          judges: [{ name: "pla" }, { name: "pla" }, { name: "pla" }],
          participants: [{ name: "pla" }, { name: "pla" }, { name: "pla" }],
          start_time: startDate,
          end_time: endDate,
        };
        createMutate(challengeData, {
          onSettled(data, error) {
            setDataLoading(false);
            console.log(data);
          },
          onSuccess() {
            setShowInvitationModal(true);
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data: ChallengeFormData) =>
    handleCreateChallenge(data);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setValue("attachments", files);
  };

  if (dataLoading) {
    return <ScreenLoader />;
  }

  return (
    <Layout>
      {showInvitationModal && (
        <InvitationPopup
          isOpen={showInvitationModal}
          onClose={() => setShowInvitationModal(false)}
          judgeLink={data?.inviteLinks.judges.link}
          participantLink={data?.inviteLinks.participants.link}
        />
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white max-w-xl w-full min-w-88 mx-auto p-3 rounded-lg shadow-md"
      >
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
        {errors.title && (
          <span className="text-red-500 text-xs">{errors.title?.message}</span>
        )}
        <div className="mb-4">
          <div className="relative flex flex-row justify-start gap-2 items-center">
            <PenLine className=" h-4 w-4 text-gray-400" />
            <Input
              className="text-lg font-normal border-none shadow-none focus-visible:ring-0 pl-8 px-2 py-1"
              placeholder="Enter challenge title..."
              {...register("title")}
            />
          </div>
        </div>
        {errors.description && (
          <span className="text-red-500 text-xs">
            {errors.description?.message}
          </span>
        )}
        <div className="">
          <TiptapEditor
            editorContent={editorContent}
            setEditorContent={setEditorContent}
          />
          {/* <Editor /> */}
          <label
            htmlFor="file-upload"
            className="cursor-pointer relative bottom-12 right-2 float-end h-0 "
          >
            <Paperclip className="h-6 w-6 text-gray-500" />
          </label>
        </div>

        <Input
          type="file"
          multiple
          id="file-upload"
          className="hidden"
          onChange={(e) => {
            const files = Array.from(e.target.files || []);
            console.log(attachments[0]);
            setAttachments((prev) => [
              ...prev,
              ...files.map((file, index) => ({
                id: index + Date.now(),
                file,
                type: file.type.split("/")[0],
                name: file.name,
                size: file.size,
              })),
            ]);
          }}
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.mp4,.mov"
        />

        {/* Attachment List */}
        {attachments.length > 0 && (
          <div className=" flex flex-row gap-2 flex-wrap items-center">
            {attachments.map((attachment) => (
              <div
                key={attachment.id}
                className="flex items-center justify-between bg-gray-50 rounded-lg p-2"
              >
                <div className="flex items-center gap-2">
                  {attachment.type === "image" && (
                    <Image className="h-4 w-4 text-gray-500" />
                  )}
                  {attachment.type === "video" && (
                    <Video className="h-4 w-4 text-gray-500" />
                  )}
                  {attachment.type === "application" && (
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
                  className="h-9"
                  {...register("duration_value")}
                />
              </div>
              <div className="flex-1">
                <Label className="text-xs text-gray-500 mb-1 pl-1 text-left flex">
                  Unit
                </Label>
                <Select
                  value={duration}
                  onValueChange={(value) => setDuration(value)}
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

        {/* Duration Settings */}
        <div className="flex items-center justify-between mb-2">
          <Label className="text-sm font-medium mb-2 block text-left">
            Reward
          </Label>
          <Switch checked={reward} onCheckedChange={setReward} />
        </div>
        {/* Reward */}
        {reward && (
          <div className="mb-4">
            {/* <Label className="text-xs text-gray-500 mb-1 text-left flex">
              Reward
            </Label> */}
            <Input
              type="number"
              placeholder="Enter prize"
              className="h-9"
              {...register("reward")}
            />
            {errors.reward && (
              <span className="text-red-500 text-xs">
                {errors.reward?.message}
              </span>
            )}
          </div>
        )}

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
        <ParticipantDropdown
          // availableUsers={availableUsers}
          selectedUsers={selectedParticipants}
          setSelectedUsers={setSelectedParticipants}
          label="Invite participants"
          placeholder="Search participants..."
        />
        <ParticipantDropdown
          // availableUsers={availableUsers}
          selectedUsers={selectedJudges}
          setSelectedUsers={setSelectedJudges}
          label="judges"
          placeholder="Search judges..."
        />

        {/* Schedule Toggle */}
        <div className=" flex flex-row items-start justify-center mb-4">
          <div className="flex flex-col">
            <Label className="text-xs text-gray-500 mb-1 text-left">
              Start Time
            </Label>
            <DatePicker date={startDate} setDate={setStartdate} />
          </div>
          <div className="flex flex-row items-center justify-end gap-4 mt-4  w-full ">
            <Label className=" text-xs md:text-sm font-medium">
              Schedule for Later
            </Label>
            <Switch checked={isScheduled} onCheckedChange={setIsScheduled} />
          </div>
        </div>

        {isScheduled && (
          <div className="flex flex-col items-start gap-3 my-2">
            <Label className="text-xs text-gray-500 mb-1">End Time</Label>
            <DatePicker date={endDate} setDate={setEnddate} />
          </div>
        )}

        {/* Create Button */}
        <Button
          className="w-full h-12 text-base font-medium bg-gray-900 hover:bg-gray-800"
          type="submit"
        >
          {isScheduled ? "Schedule Challenge" : "Create Challenge Now"}
        </Button>
      </form>
    </Layout>
  );
};

export default ChallengeCreator;
