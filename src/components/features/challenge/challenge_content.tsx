import React, { useState } from 'react';
import { Calendar, Timer, Plus, Image, Video, FileText, Users2, MessageCircle, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Link } from 'react-router';
import { Challenge } from '@/types/challenge';
import RemarksSection from './Remarks';

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
  const [activeTab, setActiveTab] = useState<'comments' | 'rankings'>('comments');
  const [newComment, setNewComment] = useState('');

  const getAttachmentIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image className="w-4 h-4" />;
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'document':
        return <FileText className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    // Handle comment submission
    setNewComment('');
  };

  return (
    <CardContent className="p-4 space-y-4">
      <div>
        <h4 className="font-medium">{challenge.title}</h4>
        <p className="text-sm text-gray-600 mt-1 text-left">
          {isExpanded ? challenge.description : `${challenge.description.slice(0, 100)}...`}
          <span
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-500 ml-1 text-sm cursor-pointer"
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </span>
        </p>
      </div>

      <div className="flex items-center justify-between space-x-4 text-sm text-gray-600">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>Ends in {challenge.endTime}</span>
          </div>
          <div className="flex items-center">
            <Timer className="w-4 h-4 mr-1" />
            <span>{challenge.duration} duration</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-green-500">${challenge.reward}</span>
          <Link to="/boost-reward">
            <Button variant="ghost" size="sm" className="p-0">
              <Plus className="w-4 h-4 text-green-500" />
            </Button>
          </Link>
        </div>
      </div>

      {challenge.attachments.length > 0 && (
        <div className="border rounded-lg p-2 space-y-4">
          <h5 className="text-sm font-medium">
            Attachments ({challenge.attachments.length})
          </h5>
          <div className="flex gap-2">
            {challenge.attachments.map((attachment, index) => (
              <div
                key={index}
                className="flex items-center p-2 bg-gray-50 rounded-md"
              >
                {getAttachmentIcon(attachment.type)}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-2 text-gray-600">
            <Users2 className="w-5 h-5" />
            <span>{challenge.participantCount}</span>
          </span>
          <button
            onClick={() => setShowRemarks(!showRemarks)}
            className="flex items-center space-x-2 text-gray-600"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Remarks</span>
          </button>
          <Button variant="ghost" size="sm" className="p-0">
            <Rocket className="w-5 h-5 text-gray-600" />
          </Button>
        </div>
        <Link to={"/submission"}>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-green-500"
          onClick={onJoin}
          >
          Join
        </Button>
            </Link>
      </div>

      {showRemarks && (
        <RemarksSection
          remarks={challenge.remarks}
          rankings={challenge.rankings}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          newComment={newComment}
          setNewComment={setNewComment}
          handleSubmitComment={handleSubmitComment}
        />
      )}
    </CardContent>
  );
};