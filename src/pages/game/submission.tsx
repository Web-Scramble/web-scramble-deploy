import { useState } from "react";
import {
  File,
  Upload,
  X,
  Link,
  PenLine,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  Code,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Layout from "@/components/ui/shared/layout";

const ChallengeSubmission = () => {
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [textFormat, setTextFormat] = useState({
    bold: false,
    italic: false,
    underline: false,
    align: "left",
  });

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  const handleFileInput = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const removeFile = (indexToRemove) => {
    setFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setSubmitting(false);
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

        <form onSubmit={handleSubmit}>
          {/* Title Input */}
          <div className="mb-6">
            <div className="relative">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg font-normal pl-8"
                placeholder="Enter submission title..."
              />
              <PenLine className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Description Editor */}
          <div className="mb-6">
            <Label className="text-sm font-medium mb-2 block">
              Description
            </Label>
            <div className="rounded-lg border">
              <textarea
                placeholder="Describe your solution..."
                className="w-full min-h-[200px] p-3 text-base resize-none border-none focus:outline-none rounded-t-lg"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                  textAlign: textFormat.align,
                  fontWeight: textFormat.bold ? "bold" : "normal",
                  fontStyle: textFormat.italic ? "italic" : "normal",
                  textDecoration: textFormat.underline ? "underline" : "none",
                }}
              />

              {/* Formatting Toolbar */}
              <div className="flex items-center justify-between border-t p-2">
                <div className="flex items-center space-x-1">
                  <div className="flex items-center border-r pr-1">
                    <Button
                      variant={textFormat.bold ? "secondary" : "ghost"}
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleFormatChange("bold")}
                      type="button"
                    >
                      <span className="font-bold">B</span>
                    </Button>
                    <Button
                      variant={textFormat.italic ? "secondary" : "ghost"}
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleFormatChange("italic")}
                      type="button"
                    >
                      <span className="italic">I</span>
                    </Button>
                    <Button
                      variant={textFormat.underline ? "secondary" : "ghost"}
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleFormatChange("underline")}
                      type="button"
                    >
                      <span className="underline">U</span>
                    </Button>
                  </div>

                  <div className="flex items-center border-r pr-1">
                    <Button
                      variant={
                        textFormat.align === "left" ? "secondary" : "ghost"
                      }
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleAlignmentChange("left")}
                      type="button"
                    >
                      <AlignLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={
                        textFormat.align === "center" ? "secondary" : "ghost"
                      }
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleAlignmentChange("center")}
                      type="button"
                    >
                      <AlignCenter className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={
                        textFormat.align === "right" ? "secondary" : "ghost"
                      }
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleAlignmentChange("right")}
                      type="button"
                    >
                      <AlignRight className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      type="button"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      type="button"
                    >
                      <Code className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    type="button"
                  >
                    <Link className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* File Upload */}
          <div className="mb-6">
            <Label className="text-sm font-medium mb-2 block">
              Attachments
            </Label>
            <div
              className="border-2 border-dashed rounded-lg p-6 text-center"
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
                    Support for images, documents, and code files
                  </span>
                </div>
              </label>
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                {files.map((file, index) => (
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
