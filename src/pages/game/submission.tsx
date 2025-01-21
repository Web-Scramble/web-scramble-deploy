import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import {
  File,
  Upload,
  X,
  PenLine,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/ui/shared/layout";
import TiptapEditor from "@/components/ui/shared/tiptap_editor";
import { submissionSchema, type SubmissionFormData } from "@/schema/submission_validation_schema";
import { useParams } from "react-router"
import { useSubmitChallenge } from "@/hooks/useSubmitChallenge";
import { useChallenges } from "@/hooks/useChallenges";


const ChallengeSubmission = () => {
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const {challengeId} = useParams()
  const {data:challenges} = useChallenges()
  

  const {
    mutate: submitChallengeMutation,
    isLoading,
    isError,
    isSuccess,
    data,
  } = useSubmitChallenge();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm<SubmissionFormData>({
    resolver: yupResolver(submissionSchema),
    defaultValues: {
      title: "",
      description: "",
      decuments: [],
    },
  });

  const files = watch("files") || [];

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setValue("files", [...files, ...droppedFiles]);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setValue("files", [...files, ...selectedFiles]);
  };

  const removeFile = (indexToRemove: number) => {
    setValue(
      "files",
      files.filter((_, index) => index !== indexToRemove)
    );
  };

  const onSubmit = async (data: SubmissionFormData) => {
    const submissionData = {...data,id:challengeId}
    submitChallengeMutation(submissionData)
  };

  // Remaining time simulation
  const timeLeft = {
    hours: 2,
    minutes: 45,
  };

  return (
    <Layout>
      <div className="bg-white w-full max-w-2xl mx-auto p-6 rounded-lg shadow-md">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            Submit Challenge Solution
          </h2>
          <Alert className="bg-blue-50">
            <AlertTitle className="text-blue-800">Time Remaining</AlertTitle>
            <AlertDescription className="text-blue-700">
              {timeLeft.hours}h {timeLeft.minutes}m left to submit
            </AlertDescription>
          </Alert>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Title Input */}
          <div className="mb-6">
            <div className="relative">
              <Input
                {...register("title")}
                className={`text-lg font-normal pl-8 ${
                  errors.title ? "border-red-500" : ""
                }`}
                placeholder="Enter submission title..."
              />
              <PenLine className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            {errors.title && (
              <span className="text-red-500 text-xs mt-1">
                {errors.title.message}
              </span>
            )}
          </div>

          {/* Description Editor */}
          <div className="mb-6">
            <Label className="text-sm font-medium mb-2 block">
              Description
            </Label>
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
              <span className="text-red-500 text-xs mt-1">
                {errors.description.message}
              </span>
            )}
          </div>

          {/* File Upload */}
          <div className="mb-6">
            <Label className="text-sm font-medium mb-2 block">
              Attachments
            </Label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center ${
                errors.files ? "border-red-500" : ""
              }`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <input
                type="file"
                multiple
                className="hidden"
                id="file-upload"
                onChange={handleFileInput}
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-8 w-8 text-gray-400" />
                  <div>
                    <span className="text-blue-600">Click to upload</span>
                    <span className="text-gray-600">
                      {" "}
                      or drag and drop files here
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    Support for images, documents, and code files (max 50MB)
                  </span>
                </div>
              </label>
            </div>
            {errors.files && (
              <span className="text-red-500 text-xs mt-1">
                {errors.files.message}
              </span>
            )}

            {/* File List */}
            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                {files.map((file: File, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <File className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{file.name}</span>
                      <span className="text-xs text-gray-400">
                        ({(file.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => removeFile(index)}
                      type="button"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Separator className="my-6" />

          {/* Submit Button */}
          <div className="flex flex-col gap-4">
            {submitting && <Progress value={66} className="w-full" />}
            <Button
              type="submit"
              className="w-full h-12 text-base font-medium bg-gray-900 hover:bg-gray-800"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Solution"}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ChallengeSubmission;