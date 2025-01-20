import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Copy, Share2 } from "lucide-react";
import { useState } from "react";
import { useToast } from '@/hooks/use-toast';
interface ShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  challengeId: string;
}

export const ShareDialog: React.FC<ShareDialogProps> = ({
  isOpen,
  onClose,
  challengeId,
}) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const shareUrl = `${window.location.origin}/challenge/${challengeId}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "Challenge link has been copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            Share Challenge
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="flex-1">
            <Input
              value={shareUrl}
              readOnly
              className="pr-12"
            />
          </div>
          <Button
            type="button"
            variant="secondary"
            className="px-3 flex items-center gap-2"
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};