import { Challenge } from "@/types/challenge";
import React from 'react';
import {  Send, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
// import { Link } from 'react-router';

interface CommentsTabProps {
    remarks: Challenge['remarks'];
    newComment: string;
    setNewComment: (comment: string) => void;
    handleSubmitComment: (e: React.FormEvent) => void;
  }
  
   const CommentsTab = ({
    remarks,
    newComment,
    setNewComment,
    handleSubmitComment,
  }:CommentsTabProps) => (
    <div className="space-y-4">
      {remarks.map((remark) => (
        <div key={remark.id} className="p-3 bg-gray-50 rounded-lg">
          <div className="flex items-start space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarFallback>{remark.avatar}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="font-medium">{remark.user}</span>
                <span className="text-sm text-gray-500">{remark.timestamp}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{remark.content}</p>
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <button className="flex items-center space-x-1 hover:text-gray-900">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{remark.likes}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
  
      <form onSubmit={handleSubmitComment} className="flex items-center space-x-2 mt-4">
        <Input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1"
        />
        <Button type="submit" size="sm">
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
  export default CommentsTab