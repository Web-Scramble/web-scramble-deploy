import React from 'react';
import { X, ChevronLeft, AlertCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Challenge, Rating } from '../types';
import { useRatingDialog } from '../hooks/useRatingDialog';

interface RatingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: Rating) => void;
  challenge: Challenge;
  isJudge: boolean;
}

export const RatingDialog: React.FC<RatingDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  challenge,
  isJudge,
}) => {
  const {
    rating,
    setRating,
    remarks,
    setRemarks,
    error,
    handleSubmit,
  } = useRatingDialog((rating) => {
    onSubmit(rating);
    onClose();
  });

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
                   className="w-full text-white py-2 px-4 rounded-md "
                 >
                   Submit Evaluation
                 </button>
               </form>
      </DialogContent>
    </Dialog>
  );
};