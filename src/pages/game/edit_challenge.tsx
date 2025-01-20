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
import { Paperclip, Image, Video, FileText, X } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import { challengeSchema, type ChallengeFormData } from "@/schema/challenge_creation_validation";
import { useCreateChallenge } from "@/hooks/useCreateChallenge";
import { useToast } from "@/hooks/use-toast";
import InvitationPopup from "@/components/modals/invitation_modal";
import TiptapEditor from "@/components/ui/shared/tiptap_editor";
import ParticipantDropdown from "@/components/features/challenge/add_participants";
import { DatePicker } from "@/components/ui/shared/calendar";
import { editChallengeSchema,EditChallengeFormData } from "@/schema/edit_challenge_schema";
import { useParams } from "react-router"
import { useChallenges } from "@/hooks/useChallenges";


const ChallengeCreator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {challengeId} = useParams()
  const [showInvitationModal, setShowInvitationModal] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const {data,isLoading} = useChallenges()
  console.log(data)
  // const [challenge, setChallenge] = useState(data.find())

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    register,
    formState: { errors, isSubmitting },
  } = useForm<EditChallengeFormData>({
    resolver: yupResolver(editChallengeSchema),
    defaultValues: {
      title: "",
      description: "",
      challengeType: "task",
      isTimeLimited: false,
      isPrivate: true,
      isScheduled: false,
      duration_value: 1,
      duration_unit: "hours",
      reward: 0,
      startDate: new Date(),
      endDate: new Date(),
      attachments: [],
      participants: [],
      judges: [],
    },
  });

  // Watch form values
  const isTimeLimited = watch("isTimeLimited");
  const isPrivate = watch("isPrivate");
  const isScheduled = watch("isScheduled");
  const attachments = watch("attachments") || [];

  // const { mutate: createMutate, isLoading,data } = useCreateChallenge();

  console.log(data)

  useEffect(() => {
    // Update form when editor content changes
    setValue("description", editorContent);
  }, [editorContent, setValue]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newAttachments = files.map((file, index) => ({
      id: `${index}-${Date.now()}`,
      file,
      type: file.type.split("/")[0],
      name: file.name,
      size: file.size,
    }));

    setValue("attachments", [...attachments, ...newAttachments]);
  };

  const removeAttachment = (idToRemove: string) => {
    setValue(
      "attachments",
      attachments.filter((item) => item.id !== idToRemove)
    );
  };

  const onSubmit = async (data: EditChallengeFormData) => {
    try {
      const challengeData = {
        challengeType: data.challengeType,
        is_public: !data.isPrivate,
        reward_pool: data.reward,
        duration_value: data.isTimeLimited ? data.duration_value : null,
        duration_unit: data.isTimeLimited ? data.duration_unit : null,
        title: data.title,
        description: data.description,
        judges: data.judges,
        participants: data.participants,
        start_time: data.startDate.toISOString(),
        end_time: data.isScheduled ? data.endDate.toISOString() as string : null,
      };
     console.log(challengeData)
    //  createMutate(challengeData);
      // toast({
      //   title: "Success",
      //   description: "Challenge created successfully!",
      // });
      // setShowInvitationModal(true);
    } catch (error) {
      // toast({
      //   title: "Error",
      //   description: "Failed to create challenge",
      //   variant: "destructive",
      // });
    }
  };
  console.log(errors)
  return (
    <Layout>
      {/* {showInvitationModal && (
        <InvitationPopup
          isOpen={showInvitationModal}
          onClose={() => setShowInvitationModal(false)}
        />
      )} */}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-full max-w-xl min-w-88 mx-auto p-3 rounded-lg shadow-md"
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
        <div className="mb-4">
          <div className="relative flex flex-col gap-1">
            <div className="relative flex flex-row justify-start gap-2 items-center">
              <PenLine className="h-4 w-4 text-gray-400" />
              <Input
                className={`text-lg font-normal ${
                  errors.title ? "border-red-500" : "border-none"
                } shadow-none focus-visible:ring-0 pl-8 px-2 py-1`}
                placeholder="Enter challenge title..."
                {...register("title")}
              />
            </div>
            {errors.title && (
              <span className="text-red-500 text-xs pl-6">
                {errors.title.message}
              </span>
            )}
          </div>
        </div>

        {/* Description Editor */}
        <div className="mb-4">
        <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TiptapEditor
                  editorContent={field.value}
                  setEditorContent={(content) => field.onChange(content)}
                />
              )}
            />
          {errors.description && (
            <span className="text-red-500 text-xs">
              {errors.description.message}
            </span>
          )}
          <label
            htmlFor="file-upload"
            className="cursor-pointer relative bottom-12 right-2 float-end h-0"
          >
            <Paperclip className="h-6 w-6 text-gray-500" />
          </label>
        </div>

        {/* File Upload */}
        <Input
          type="file"
          multiple
          id="file-upload"
          className="hidden"
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.mp4,.mov"
        />

        {/* Attachment List */}
        {attachments.length > 0 && (
          <div className="flex flex-row gap-2 flex-wrap items-center">
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
                  onClick={() => removeAttachment(attachment.id)}
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
          <Controller
            name="challengeType"
            control={control}
            render={({ field }) => (
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant={field.value === "task" ? "default" : "outline"}
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => field.onChange("task")}
                >
                  <Clock className="h-4 w-4" />
                  Task
                </Button>
                <Button
                  type="button"
                  variant={field.value === "prize" ? "default" : "outline"}
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => field.onChange("prize")}
                >
                  <Trophy className="h-4 w-4" />
                  Prize Challenge
                </Button>
                <Button
                  type="button"
                  variant={field.value === "blog" ? "default" : "outline"}
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => field.onChange("blog")}
                >
                  <AlignLeft className="h-4 w-4" />
                  Blog
                </Button>
              </div>
            )}
          />
          {errors.challengeType && (
            <span className="text-red-500 text-xs">
              {errors.challengeType.message}
            </span>
          )}
        </div>

        {/* Duration Settings */}
        <div className="flex items-center justify-between mb-2">
          <Label className="text-sm font-medium mb-2 block text-left">
            Time Limit
          </Label>
          <Controller
            name="isTimeLimited"
            control={control}
            render={({ field }) => (
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
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
                  className={`h-9 ${errors.duration_value ? "border-red-500" : ""}`}
                  {...register("duration_value")}
                />
                {errors.duration_value && (
                  <span className="text-red-500 text-xs">
                    {errors.duration_value.message}
                  </span>
                )}
              </div>
              <div className="flex-1">
                <Label className="text-xs text-gray-500 mb-1 pl-1 text-left flex">
                  Unit
                </Label>
                <Controller
                  name="duration_unit"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      {/* <SelectTrigger className={`h-9 ${ */}
                        <SelectTrigger className={`h-9 ${errors.duration_unit ? "border-red-500" : ""}`}>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minutes">Minutes</SelectItem>
                        <SelectItem value="hours">Hours</SelectItem>
                        <SelectItem value="days">Days</SelectItem>
                        <SelectItem value="weeks">Weeks</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.duration_unit && (
                  <span className="text-red-500 text-xs">
                    {errors.duration_unit.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Reward */}
        <div className="mb-4">
          <Label className="text-xs text-gray-500 mb-1 text-left flex">
            Reward
          </Label>
          <Input
            type="number"
            placeholder="Enter prize"
            className={`h-9 ${errors.reward ? "border-red-500" : ""}`}
            {...register("reward")}
          />
          {errors.reward && (
            <span className="text-red-500 text-xs">
              {errors.reward.message}
            </span>
          )}
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
          <Controller
            name="isPrivate"
            control={control}
            render={({ field }) => (
              <Switch
                checked={!field.value}
                onCheckedChange={(checked) => field.onChange(!checked)}
              />
            )}
          />
        </div>

        {/* Participants and Judges */}
        <Controller
          name="participants"
          control={control}
          render={({ field }) => (
            <ParticipantDropdown
              selectedUsers={field.value}
              setSelectedUsers={(users) => field.onChange(users)}
              label="Invite participants"
              placeholder="Search participants..."
            />
          )}
        />

        <Controller
          name="judges"
          control={control}
          render={({ field }) => (
            <ParticipantDropdown
              selectedUsers={field.value}
              setSelectedUsers={(users) => field.onChange(users)}
              label="judges"
              placeholder="Search judges..."
            />
          )}
        />

        {/* Schedule Settings */}
        <div className="flex flex-row items-start justify-center mb-4">
          <div className="flex flex-col">
            <Label className="text-xs text-gray-500 mb-1 text-left">
              Start Time
            </Label>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  date={field.value}
                  setDate={(date) => field.onChange(date)}
                />
              )}
            />
            {errors.startDate && (
              <span className="text-red-500 text-xs">
                {errors.startDate.message}
              </span>
            )}
          </div>
          <div className="flex flex-row items-center justify-end gap-4 mt-4 w-full">
            <Label className="text-xs md:text-sm font-medium">
              Schedule for Later
            </Label>
            <Controller
              name="isScheduled"
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </div>
        </div>

        {isScheduled && (
          <div className="flex flex-col items-start gap-3 my-2">
            <Label className="text-xs text-gray-500 mb-1">End Time</Label>
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  date={field.value}
                  setDate={(date) => field.onChange(date)}
                />
              )}
            />
            {errors.endDate && (
              <span className="text-red-500 text-xs">
                {errors.endDate.message}
              </span>
            )}
          </div>
        )}

        {/* Submit Button */}
        <Button
          className="w-full h-12 text-base font-medium bg-gray-900 hover:bg-gray-800"
          type="submit"
          disabled={isSubmitting || isLoading}
        >
          {isSubmitting || isLoading ? (
            "Creating..."
          ) : isScheduled ? (
            "Schedule Challenge"
          ) : (
            "Create Challenge Now"
          )}
        </Button>
      </form>
    </Layout>
  );
};

export default ChallengeCreator;