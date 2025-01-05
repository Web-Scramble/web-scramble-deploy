import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, Video, FileText, Link } from 'lucide-react';
import { Submission, Rating, MediaType } from '@/types/submission';
import { MediaViewer } from './media_viewer';
import { RatingDialog } from '@/components/modals/ratings_modal';
import { formatDate } from '@/utils/formatDate';
import { Button } from '@/components/ui/button';

interface SubmissionCardProps {
  submission: Submission;
  isJudge: boolean;
  onVote: (submissionId: number, rating: Rating) => void;
}

export const SubmissionCard = ({
  submission,
  isJudge,
  onVote,
}:SubmissionCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);

  const getMediaTypeIcon = (type: MediaType) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />;
      case "image":
        return <FileText className="h-4 w-4" />;
      case "document":
        return <FileText className="h-4 w-4" />;
      default:
        return <Link className="h-4 w-4" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* <div className="bg-white rounded-lg shadow-md mb-4 overflow-hidden"> */}
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
                    <h3 className="text-xl font-bold mb-2">
                      Challenge Description
                    </h3>
                    <p className="text-sm text-gray-600">
                      {submission.challenge.description}
                    </p>
                  </div>
      
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Submission Details
                    </h3>
                    <p className="text-sm text-gray-600">{submission.details}</p>
                  </div>
      
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Submission Content
                    </h3>
                    {submission.media.map((media, index) => (
                      <MediaViewer key={index} media={media} />
                    ))}
                  </div>
      
                  <Button
                    onClick={() => setIsRatingOpen(true)}
                    className="w-full text-white px-4 py-2 rounded-md text-sm "
                  >
                    Evaluate Submission
                  </Button>
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
          {/* </div> */}
    </div>
  );
};