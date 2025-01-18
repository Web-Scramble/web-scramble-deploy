import React, { useEffect, useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { Button } from '@/components/ui/button';
import { Label } from "@/components/ui/label";
import Layout from "@/components/ui/shared/layout";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const SuccessIcon = () => (
  <div className="rounded-full bg-green-500 p-3">
    <svg className="w-6 h-6 text-white" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M15.4695 0.232963C15.8241 0.561287 15.8454 1.1149 15.5171 1.46949L6.14206 11.5945C5.97228 11.7778 5.73221 11.8799 5.48237 11.8748C5.23253 11.8698 4.99677 11.7582 4.83452 11.5681L0.459523 6.44311C0.145767 6.07557 0.18937 5.52327 0.556912 5.20951C0.924454 4.89575 1.47676 4.93936 1.79051 5.3069L5.52658 9.68343L14.233 0.280522C14.5613 -0.0740672 15.1149 -0.0953599 15.4695 0.232963Z" fill="currentColor"/>
    </svg>
  </div>
);

const ErrorIcon = () => (
  <div className="rounded-full bg-red-500 p-3">
    <svg className="w-6 h-6 text-white" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M1.25628 1.25628C1.59799 0.914573 2.15201 0.914573 2.49372 1.25628L8 6.76256L13.5063 1.25628C13.848 0.914573 14.402 0.914573 14.7437 1.25628C15.0854 1.59799 15.0854 2.15201 14.7437 2.49372L9.23744 8L14.7437 13.5063C15.0854 13.848 15.0854 14.402 14.7437 14.7437C14.402 15.0854 13.848 15.0854 13.5063 14.7437L8 9.23744L2.49372 14.7437C2.15201 15.0854 1.59799 15.0854 1.25628 14.7437C0.914573 14.402 0.914573 13.848 1.25628 13.5063L6.76256 8L1.25628 2.49372C0.914573 2.15201 0.914573 1.59799 1.25628 1.25628Z" fill="currentColor"/>
    </svg>
  </div>
);

const InfoIcon = () => (
  <div className="rounded-full bg-gray-500 p-3">
    <svg className="w-6 h-6 text-white" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M10 1.5H4C2.61929 1.5 1.5 2.61929 1.5 4V10C1.5 11.3807 2.61929 12.5 4 12.5H10C11.3807 12.5 12.5 11.3807 12.5 10V4C12.5 2.61929 11.3807 1.5 10 1.5ZM4 0C1.79086 0 0 1.79086 0 4V10C0 12.2091 1.79086 14 4 14H10C12.2091 14 14 12.2091 14 10V4C14 1.79086 12.2091 0 10 0H4Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M5.25 7C5.25 6.58579 5.58579 6.25 6 6.25H7.25C7.66421 6.25 8 6.58579 8 7V10.5C8 10.9142 7.66421 11.25 7.25 11.25C6.83579 11.25 6.5 10.9142 6.5 10.5V7.75H6C5.58579 7.75 5.25 7.41421 5.25 7Z" fill="currentColor"/>
      <path d="M5.75 4C5.75 3.31075 6.31075 2.75 7 2.75C7.68925 2.75 8.25 3.31075 8.25 4C8.25 4.68925 7.68925 5.25 7 5.25C6.31075 5.25 5.75 4.68925 5.75 4Z" fill="currentColor"/>
    </svg>
  </div>
);

const STATUS_CONTENT_MAP = {
  succeeded: {
    text: "Payment succeeded",
    icon: <SuccessIcon />,
    textColor: "text-green-700"
  },
  processing: {
    text: "Your payment is processing.",
    icon: <InfoIcon />,
    textColor: "text-gray-700"
  },
  requires_payment_method: {
    text: "Your payment was not successful, please try again.",
    icon: <ErrorIcon />,
    textColor: "text-red-700"
  },
  default: {
    text: "Something went wrong, please try again.",
    icon: <ErrorIcon />,
    textColor: "text-red-700"
  }
};

export default function CompletePage() {
  const stripe = useStripe();
  const [status, setStatus] = useState("default");
  const [intentId, setIntentId] = useState(null);

  useEffect(() => {
    if (!stripe) return;

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) return;

    stripe.retrievePaymentIntent(clientSecret).then(({paymentIntent}) => {
      if (!paymentIntent) return;
      setStatus(paymentIntent.status);
      setIntentId(paymentIntent.id);
    });
  }, [stripe]);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center p-4">
      <Card className="w-full max-w-lg animate-fadeIn h-4/5">
        <CardContent className="flex flex-col items-center space-y-6 pt-6">
          {/* Status Icon */}
          <div className="mb-2">
            {STATUS_CONTENT_MAP[status].icon}
          </div>

          {/* Status Text */}
          <h2 className={`text-xl font-semibold ${STATUS_CONTENT_MAP[status].textColor}`}>
            {STATUS_CONTENT_MAP[status].text}
          </h2>

          {/* Payment Details */}
          {intentId && (
            <div className="w-full bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Payment ID</span>
                <span className="font-mono text-sm">{intentId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Status</span>
                <span className="capitalize font-medium">{status}</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 w-full">
            {intentId && (
              <Button
                variant="outline"
                className="flex items-center gap-2"
                asChild
              >
                <a
                  href={`https://dashboard.stripe.com/payments/${intentId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View in Dashboard
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
            <Button
              asChild
              className={status === 'succeeded' ? 'bg-green-600 hover:bg-green-700' : ''}
            >
              <a href="/checkout">
                {status === 'succeeded' ? 'Make Another Payment' : 'Try Again'}
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}