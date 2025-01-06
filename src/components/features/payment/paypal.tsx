import  { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const PayPalForm = () => {
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [paypalOption, setPaypalOption] = useState('paypal-balance');

  return (
    <div className="space-y-6">
      {/* PayPal Account */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">PayPal Account Details</h3>
        <div>
          <Label>PayPal Email</Label>
          <Input type="email" placeholder="email@example.com" />
        </div>
        
        <div>
          <Label>Payment Option</Label>
          <Select value={paypalOption} onValueChange={setPaypalOption}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="paypal-balance">PayPal Balance</SelectItem>
              <SelectItem value="bank-account">Bank Account</SelectItem>
              <SelectItem value="credit-card">Credit Card via PayPal</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Shipping Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Shipping Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>First Name</Label>
            <Input placeholder="John" />
          </div>
          <div>
            <Label>Last Name</Label>
            <Input placeholder="Doe" />
          </div>
        </div>
        <div>
          <Label>Address Line 1</Label>
          <Input placeholder="Street address" />
        </div>
        <div>
          <Label>Address Line 2</Label>
          <Input placeholder="Apt, Suite, etc. (optional)" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>City</Label>
            <Input placeholder="City" />
          </div>
          <div>
            <Label>State/Province</Label>
            <Input placeholder="State" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Postal Code</Label>
            <Input placeholder="ZIP Code" />
          </div>
          <div>
            <Label>Country</Label>
            <Select defaultValue="us">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <Label>Phone Number</Label>
          <Input type="tel" placeholder="+1 (555) 000-0000" />
        </div>
      </div>

      {/* Billing Information */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="shipping"
            checked={sameAsShipping}
            onCheckedChange={setSameAsShipping}
          />
          <label
            htmlFor="shipping"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Billing address same as shipping
          </label>
        </div>

        {!sameAsShipping && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Billing Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>First Name</Label>
                <Input placeholder="John" />
              </div>
              <div>
                <Label>Last Name</Label>
                <Input placeholder="Doe" />
              </div>
            </div>
            <div>
              <Label>Address Line 1</Label>
              <Input placeholder="Street address" />
            </div>
            <div>
              <Label>Address Line 2</Label>
              <Input placeholder="Apt, Suite, etc. (optional)" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>City</Label>
                <Input placeholder="City" />
              </div>
              <div>
                <Label>State/Province</Label>
                <Input placeholder="State" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Postal Code</Label>
                <Input placeholder="ZIP Code" />
              </div>
              <div>
                <Label>Country</Label>
                <Select defaultValue="us">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="pt-4">
        <Button className="w-full" size="lg">
          Continue with PayPal
        </Button>
      </div>
    </div>
  );
};

export default PayPalForm;