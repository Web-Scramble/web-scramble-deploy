import React, { useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  FileText,
  Video,
  // Image,
  Clock,
  Link,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Layout from "@/components/ui/shared/layout";

// Media Viewer Component
const MediaViewer = ({ media }) => {
  const getMediaComponent = () => {
    switch (media.type) {
      case "video":
        return (
          <div className="relative w-full pt-[56.25%] bg-gray-100 rounded-lg">
            <img
              src="/api/placeholder/640/360"
              alt="Video placeholder"
              className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
              width={100}
              height={100}
            />
          </div>
        );
      case "image":
        return (
          <img
            src="/api/placeholder/640/360"
            alt={media.description}
            className="w-full h-auto rounded-lg"
            width={100}
            height={100}
          />
        );
      case "document":
        return (
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <FileText className="h-5 w-5 text-gray-500 mr-2" />
            <span className="text-sm text-gray-700">{media.filename}</span>
          </div>
        );
      case "link":
        return (
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <Link className="h-5 w-5 text-gray-500 mr-2" />
            <span className="text-sm text-gray-700">{media.title}</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mb-4">
      {getMediaComponent()}
      {media.description && (
        <p className="text-sm text-gray-600 mt-2">{media.description}</p>
      )}
    </div>
  );
};

// Format Date Helper
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// RatingDialog Component
const RatingDialog = ({ isOpen, onClose, onSubmit, challenge, isJudge }) => {
  const [rating, setRating] = useState("");
  const [remarks, setRemarks] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!rating || !remarks) {
      setError("Both rating and remarks are required");
      return;
    }

    const numRating = parseFloat(rating);
    if (isNaN(numRating) || numRating < 0 || numRating > 10) {
      setError("Rating must be between 0 and 10");
      return;
    }

    onSubmit({ rating: numRating, remarks });
    setRating("");
    setRemarks("");
    setError("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto p-4 rounded-lg bg-white">
        <DialogHeader>
          <div className="flex items-center justify-between mb-4">
            <button onClick={onClose} className="text-gray-500">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <DialogTitle className="text-lg font-semibold text-center flex-1">
              Challenge Evaluation
            </DialogTitle>
            <button onClick={onClose} className="text-gray-500">
              <X className="h-6 w-6" />
            </button>
          </div>
        </DialogHeader>

        <div className="mb-6">
          <h3 className="font-medium text-gray-700 mb-2">{challenge?.title}</h3>
          <p className="text-sm text-gray-600 mb-4">
            {isJudge ? "Judge Evaluation Form" : "Community Feedback Form"}
          </p>
          <p className="text-sm text-gray-600">
            Please provide your detailed evaluation for this submission. Your
            feedback helps maintain quality standards and encourages
            improvement.
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Score (0-10)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="10"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter score (decimals allowed)"
            />
            <p className="text-xs text-gray-500 mt-1">
              Decimal values are allowed (e.g., 8.5)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Evaluation Comments
            </label>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full p-2 border rounded-md h-32"
              placeholder="Provide detailed feedback on the submission"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Submit Evaluation
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Challenge Submission Card Component
const ChallengeSubmissionCard = ({ submission, isJudge, onVote }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);

  const getMediaTypeIcon = (type) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />;
      case "image":
        return <Video className="h-4 w-4" />;
      case "document":
        return <FileText className="h-4 w-4" />;
      default:
        return <Link className="h-4 w-4" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md mb-4 overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-500">
              {formatDate(submission.submittedAt)}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            {submission.media.map((item, index) => (
              <span key={index} className="text-gray-400">
                {getMediaTypeIcon(item.type)}
              </span>
            ))}
          </div>
        </div>

        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <h2 className="text-lg font-semibold text-gray-800">
            {submission.challenge.title}
          </h2>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </div>

        {isExpanded && (
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Challenge Description
              </h3>
              <p className="text-sm text-gray-600">
                {submission.challenge.description}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Submission Details
              </h3>
              <p className="text-sm text-gray-600">{submission.details}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Submission Content
              </h3>
              {submission.media.map((media, index) => (
                <MediaViewer key={index} media={media} />
              ))}
            </div>

            <button
              onClick={() => setIsRatingOpen(true)}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
            >
              Evaluate Submission
            </button>
          </div>
        )}
      </div>

      <RatingDialog
        isOpen={isRatingOpen}
        onClose={() => setIsRatingOpen(false)}
        onSubmit={(rating) => {
          onVote(submission.id, rating);
          setIsRatingOpen(false);
        }}
        challenge={submission.challenge}
        isJudge={isJudge}
      />
    </div>
  );
};

// Main Component with sample data
const ChallengeSubmissions = () => {
  const [isJudge] = useState(true);
  const [submissions] = useState([
    {
      id: 1,
      challenge: {
        title: "Enterprise Dashboard Implementation",
        description:
          "Build a scalable dashboard with real-time data visualization, role-based access control, and comprehensive analytics reporting.",
      },
      details:
        "Implemented using React with TypeScript, featuring modular components, real-time WebSocket integration, and comprehensive test coverage.",
      submittedAt: "2024-12-25T10:00:00Z",
      media: [
        {
          type: "video",
          url: "/demo-video.mp4",
          description: "Dashboard demo walkthrough",
        },
        {
          type: "document",
          url: "/technical-docs.pdf",
          filename: "Technical Documentation.pdf",
          description: "Implementation details and architecture overview",
        },
        {
          type: "link",
          url: "https://github.com/example/project",
          title: "GitHub Repository",
        },
      ],
    },
    {
      id: 2,
      challenge: {
        title: "API Gateway Architecture",
        description:
          "Design and implement a secure API gateway with rate limiting, authentication, and request validation.",
      },
      details:
        "Built using Node.js and Express, implementing JWT authentication, Redis-based rate limiting, and comprehensive request validation middleware.",
      submittedAt: "2024-12-24T15:30:00Z",
      media: [
        {
          type: "image",
          url: "/architecture-diagram.png",
          description: "System architecture diagram",
        },
        {
          type: "document",
          url: "/api-docs.pdf",
          filename: "API Documentation.pdf",
        },
      ],
    },
  ]);

  const handleVote = (submissionId, rating) => {
    console.log("Evaluation submitted:", { submissionId, rating });
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto p-4">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Challenge Submissions
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            {isJudge ? "Judge Review Panel" : "Community Review"}
          </p>
        </header>

        <div className="space-y-4">
          {submissions.map((submission) => (
            <ChallengeSubmissionCard
              key={submission.id}
              submission={submission}
              isJudge={isJudge}
              onVote={handleVote}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ChallengeSubmissions;
