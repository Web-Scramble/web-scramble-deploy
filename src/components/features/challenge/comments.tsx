import { Challenge } from "@/types/challenge";
import React, { useEffect } from "react";
import { Send, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChallenges } from "@/hooks/useChallenges";
import { useLikeComment } from "@/hooks/useLikeComment";

interface CommentsTabProps {
  comment: Challenge["comment"];
  newComment: string;
  setNewComment: (comment: string) => void;
  handleSubmitComment: (e: React.FormEvent) => void;
  challengeId:string;
}

const CommentsTab = ({
  comment,
  newComment,
  setNewComment,
  handleSubmitComment,
  challengeId
}: CommentsTabProps) => {
  const { mutate: likeMutate } = useLikeComment();
  const {challenges, refetch } = useChallenges();

  
  return (
    <div className="space-y-4">
      {comment &&
        comment.map((remark) => (
          <div key={remark.id} className="p-3 bg-gray-50 rounded-lg">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={remark.profile_picture} alt={"user pic"} />
                  <AvatarFallback>{remark.profile_picture}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{remark.username}</span>
                <span className="text-sm text-gray-500 ml-auto">
                  {new Date(remark.created_at).toLocaleTimeString()}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 text-left pr-16">{remark.message}</p>
                <div className="flex items-center mt-2">
                  <Button
                    variant={"ghost"}
                    className="flex items-center gap-1 hover:text-gray-900"
                    onClick={() => {
                      const data = remark.id
                      likeMutate({id:remark.id,challengeId:challengeId}, {
                        onSuccess() {
                          refetch();
                        },
                      });
                    }}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>{remark.like_count}</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      <form
        onSubmit={handleSubmitComment}
        className="flex items-center space-x-2 mt-4"
      >
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
};

export default CommentsTab;