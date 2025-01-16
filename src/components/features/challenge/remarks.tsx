import { Challenge } from "@/types/challenge";
import RankingsTab from "./ranking";
import React from 'react';
import CommentsTab from "./comments";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router';
interface RemarksSectionProps {
    remarks: Challenge['remarks'];
    rankings: Challenge['rankings'];
    activeTab: 'comments' | 'rankings';
    setActiveTab: (tab: 'comments' | 'rankings') => void;
    newComment: string;
    setNewComment: (comment: string) => void;
    handleSubmitComment: (e: React.FormEvent) => void;
  }
  
  const RemarksSection= ({
    remarks,
    rankings,
    activeTab,
    setActiveTab,
    newComment,
    setNewComment,
    handleSubmitComment,
  }:RemarksSectionProps) => {
    return (
      <div className="mt-4 border rounded-lg p-4">
        <div className="flex justify-between items-center mb-4 border-b">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('comments')}
              className={`pb-2 px-4 ${
                activeTab === 'comments'
                  ? 'border-b-2 border-gray-900 font-medium'
                  : 'text-gray-500'
              }`}
            >
              Comments
            </button>
            <button
              onClick={() => setActiveTab('rankings')}
              className={`pb-2 px-4 ${
                activeTab === 'rankings'
                  ? 'border-b-2 border-gray-900 font-medium'
                  : 'text-gray-500'
              }`}
            >
              Rankings
            </button>
          </div>
          <Link to={"/review-panel"}>
          <Button variant={"ghost"} className="border">
            Vote
          </Button>
          </Link>
        </div>
  
        {activeTab === 'comments' && (
          <CommentsTab
            comment={remarks}
            newComment={newComment}
            setNewComment={setNewComment}
            handleSubmitComment={handleSubmitComment}
          />
        )}
  
        {activeTab === 'rankings' && (
          <RankingsTab rankings={rankings} />
        )}
      </div>
    );
  };
  export default RemarksSection