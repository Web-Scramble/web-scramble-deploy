import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, Flag } from "lucide-react";

type tationPopupProps = {
    isOpen: boolean;
    onClose: () => void;
  };
const reportReasons = [
  {
    id: "inappropriate",
    label: "Inappropriate Content",
    description: "The challenge contains offensive, explicit, or inappropriate material",
  },
  {
    id: "spam",
    label: "Spam or Misleading",
    description: "The challenge appears to be spam, scam, or misleading",
  },
//   {
//     id: "copyright",
//     label: "Copyright Violation",
//     description: "The challenge violates copyright or intellectual property rights",
//   },
//   {
//     id: "harassment",
//     label: "Harassment or Bullying",
//     description: "The challenge promotes harassment, bullying, or hate speech",
//   },
  {
    id: "other",
    label: "Other",
    description: "Other reason not listed above",
  },
];

const DemoReportModal = ({isOpen,onClose}:tationPopupProps) => {
    const [selectedReason, setSelectedReason] = useState(false)

  return (
      <Dialog open={isOpen} onOpenChange={onClose} >
        <DialogContent className="sm:max-w-[425px]" >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Report Challenge
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              You are reporting: <span className="font-medium">Build a Weather App</span>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-4">
              <Label>Reason for reporting</Label>
              <RadioGroup
                className="gap-3"
                value={selectedReason}
                onValueChange={setSelectedReason}
              >
                {reportReasons.map((reason) => (
                  <div
                    key={reason.id}
                    className={`flex items-center space-x-2 rounded-lg border p-3 
                      ${
                        selectedReason === reason.id
                          ? "border-primary bg-primary/5"
                          : "border-gray-200"
                      }`}
                  >
                    <RadioGroupItem value={reason.id} id={reason.id} />
                    <Label
                      htmlFor={reason.id}
                      className="flex-1 cursor-pointer space-y-1"
                    >
                      <div className="font-medium">{reason.label}</div>
                      <div className="text-xs text-gray-500">
                        {reason.description}
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {selectedReason && (
              <div className="space-y-2">
                <Label>Additional Details</Label>
                <Textarea
                  placeholder="Please provide any additional details about your report..."
                  rows={4}
                />
              </div>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                // onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                Submit Report
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    // </div>
  );
};

export default DemoReportModal;