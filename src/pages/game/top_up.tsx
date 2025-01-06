import React, { useState } from 'react';
import {
  CreditCard,
  DollarSign,
  Wallet,
  Star,
  CheckCircle2,
  Clock,
  ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Layout from '@/components/ui/shared/layout';

export default function TopUpPage() {
  const [selectedAmount, setSelectedAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  
  const predefinedAmounts = [
    { value: '10', label: '$10' },
    { value: '25', label: '$25' },
    { value: '50', label: '$50' },
    { value: '100', label: '$100' },
  ];

  return (
    <Layout>
    <div className="max-w-2xl mx-auto p-4">
      <div className="grid gap-6">
        {/* Current Balance Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-green-50 rounded-full">
                  <Wallet className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Current Balance</p>
                  <p className="text-2xl font-semibold">$45.00</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Transaction History
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Amount Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Amount</CardTitle>
            <CardDescription>Choose an amount to top up</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {predefinedAmounts.map((amount) => (
                <Button
                  key={amount.value}
                  variant={selectedAmount === amount.value ? "default" : "outline"}
                  className="h-16"
                  onClick={() => {
                    setSelectedAmount(amount.value);
                    setCustomAmount('');
                  }}
                >
                  <DollarSign className="h-4 w-4 mr-2" />
                  {amount.label}
                </Button>
              ))}
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <DollarSign className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                type="number"
                placeholder="Enter custom amount"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount('');
                }}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Select your preferred payment method</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                <div className="flex items-center space-x-4">
                  <CreditCard className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium">Credit Card ending in 4242</p>
                    <p className="text-sm text-gray-500">Expires 12/24</p>
                  </div>
                </div>
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              
              <Button variant="outline" className="flex items-center justify-center">
                <CreditCard className="h-4 w-4 mr-2" />
                Add New Card
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" size="lg">
              Pay ${selectedAmount || customAmount || '0'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
    </Layout>
  );
}