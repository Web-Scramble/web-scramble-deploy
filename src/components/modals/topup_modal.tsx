import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { DollarSign } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { authStore } from "@/store/authstore";


interface TopUpModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (amount: number) => void;
  initialAmount?: number;
}

export const TopUpModal: React.FC<TopUpModalProps> = ({
  isOpen,
  onOpenChange,
  onSubmit,
  initialAmount = 20
}) => {
  const [amount, setAmount] = useState(initialAmount);
  const presetAmounts = [5, 10, 20, 50, 100];
  const { user } = authStore();


  const handleSliderChange = (value: number[]) => {
    setAmount(value[0]);
  };

  const handleSubmit = () => {
    onSubmit(amount);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            Topup Account
          </DialogTitle>
          <DialogDescription className="text-center">
            Fund your user account using our various payment methods
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8 py-4">
          {/* Current Amount Display */}
          <div className="text-center space-y-2">
            <div className="text-muted-foreground text-sm">Current Amount</div>
            <div className="flex items-center justify-center text-5xl font-bold">
              <DollarSign className="h-8 w-8" />
              {amount}
            </div>
          </div>

          {/* Preset Amount Buttons */}
          <div className="grid grid-cols-5 gap-2">
            {presetAmounts.map((preset) => (
              <Button
                key={preset}
                variant={amount === preset ? "default" : "outline"}
                className="h-12"
                onClick={() => setAmount(preset)}
              >
                ${preset}
              </Button>
            ))}
          </div>

          {/* Slider */}
          <div className="space-y-4">
            <Slider
              value={[amount]}
              min={1}
              max={100}
              step={1}
              onValueChange={handleSliderChange}
              className="mt-6"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>$1</span>
              <span>$100</span>
            </div>
          </div>

          {/* Custom Amount Input */}
          <div>
            <p className="text-xs text-gray-500 my-1">
              Enter custom amount
            </p>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="text-center text-lg"
              min={1}
              max={1000}
            />
            <div className="text-xs text-muted-foreground text-center mt-2">
              99 cents minimum
            </div>
          </div>

          {/* Submit Button */}
          <Button
            className="w-full text-white h-12 text-lg"
            onClick={handleSubmit}
          >
            Add Money
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};