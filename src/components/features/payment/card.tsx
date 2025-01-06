import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select';

 export const CardPaymentForm = () => {
    return (
      <div className="space-y-6">
        {/* Card Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Card Information</h3>
          <div>
            <Label>Card Number</Label>
            <Input placeholder="1234 5678 9012 3456" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Expiry Date</Label>
              <Input placeholder="MM/YY" />
            </div>
            <div>
              <Label>Security Code</Label>
              <Input placeholder="CVC" />
            </div>
          </div>
        </div>
  
        {/* Cardholder Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Cardholder Information</h3>
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
            <Label>Email</Label>
            <Input type="email" placeholder="email@example.com" />
          </div>
          <div>
            <Label>Phone Number</Label>
            <Input type="tel" placeholder="+1 (555) 000-0000" />
          </div>
        </div>
  
        {/* Billing Address */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Billing Address</h3>
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
  
        <div className="pt-4">
          <Button className="w-full" size="lg">
            Pay Now
          </Button>
        </div>
      </div>
    );
  };