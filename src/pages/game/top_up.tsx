import { useState } from 'react';
import { CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { ApplePayForm } from '@/components/features/payment/apple_pay';
import PayPalForm from '@/components/features/payment/paypal';
import { CardPaymentForm } from '@/components/features/payment/card';

function ApplePayIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.41 2.865 8.138 6.84 9.466V16.5h-2.063v-2.97H6.84v-2.256c0-2.035 1.21-3.156 3.067-3.156.89 0 1.82.156 1.82.156v1.996h-1.024c-1.01 0-1.326.626-1.326 1.27v1.52h2.256l-.36 2.97h-1.896V21.5C19.135 20.172 22 16.444 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState('card');

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      <Card>
        <CardContent className="pt-6">
          <RadioGroup 
            value={paymentMethod} 
            onValueChange={setPaymentMethod}
            className="space-y-4"
          >
            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <RadioGroupItem  value="card" id="card" />
                <Label htmlFor="card" className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Credit Card</span>
                </Label>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="apple-pay" id="apple-pay"/>
                <Label htmlFor="apple-pay" className="flex items-center space-x-2">
                  <ApplePayIcon />
                  <span>Apple Pay</span>
                </Label>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="paypal" id="paypal" />
                <Label htmlFor="paypal" className="flex items-center space-x-2">
                  {/* <PaypalIcon className="h-5 w-5" /> */}
                  <span>PayPal</span>
                </Label>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          {paymentMethod === 'card' && <CardPaymentForm />}
          {paymentMethod === 'paypal' && <PayPalForm />}
          {paymentMethod === 'apple-pay' && <ApplePayForm />}

          <div className="mt-6">
            <Button className="w-full" size="lg">
              Pay $50.00
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}