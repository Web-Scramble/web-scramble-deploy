import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign } from 'lucide-react';
import Layout from '@/components/ui/shared/layout';

const BoostRewardPage = () => {
  const [amount, setAmount] = useState(20);
  const presetAmounts = [5, 10, 20, 50, 100];

  const handleSliderChange = (value) => {
    setAmount(value[0]);
  };

  return (
    <Layout>

    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-md">
        <Card className="bg-white shadow-lg">
          <CardContent className="pt-6 space-y-8">
            {/* Description */}
            <div className="text-center space-y-2">
              <h2 className="text-lg font-medium">Contribute to boost the reward</h2>
              <p className="text-sm text-muted-foreground">
                Increase the reward pool for the winner of this challenge
              </p>
            </div>

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
          </CardContent>
        </Card>

        {/* Bottom Action Button */}
        <div className="mt-6">
          <Button 
            className="w-full text-white h-12 text-lg"
          >
            Add Money
          </Button>
        </div>
      </main>
    </div>
    </Layout>
  );
};

export default BoostRewardPage;