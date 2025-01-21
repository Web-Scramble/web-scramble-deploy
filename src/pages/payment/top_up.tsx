import Layout from "@/components/ui/shared/layout";
import { authStore } from "@/store/authstore";
import { useState, useEffect } from "react";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/features/payment/checkout_form";
import { getToken } from "@/services/getToken";
import { intentStore } from "@/store/intentStore";

export const stripePromise = loadStripe(
  "pk_test_51Qc31ZCYjeTr7iKH3najWXrQeUqf2AEU2YJ4q8T6iudU9fTdbyixcTVK3TGVPWwIiKPtgJP7K1KoOHx3TP4ea6Mv00uFbXc7u4"
);

export default function TopUp() {
  // Make sure to call loadStripe outside of a component’s render to avoid
  // recreating the Stripe object on every render.
  // This is a public sample test API key.
  // Don’t submit any personally identifiable information in requests made with this key.
  // Sign in to see your own test API key embedded in code samples.
  const {updateClient,updatePromise} = intentStore()



  const appearance = {
    theme: "stripe",
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = "auto";
  const authToken = getToken();
  const { user,refillAmount } = authStore();

  const [clientSecret, setClientSecret] = useState("");
  const baseURL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(`${baseURL}payment/refill`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ amount: refillAmount }),
    })
      .then((res) => res.json())
      // .then((data) => console.log(data));
      .then((data) => {setClientSecret(data.clientSecret)
        updateClient(data.clientSecret)
        // updatePromise(stripePromise)
      });

  }, []);

  return (
    <Layout>
       {clientSecret && (
        <Elements
          options={{ clientSecret, appearance, loader }}
          stripe={stripePromise}
        >
          <CheckoutForm />
        </Elements>
    )}
    </Layout>
  );
}
