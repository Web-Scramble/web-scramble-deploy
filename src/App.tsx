import "./App.css";
import { Routes, Route, Navigate } from "react-router";
import { useState, useEffect } from "react";
import {
  OTPVerification,
  LandingPage,
  AuthPage,
  UsernameSetup,
} from "@/pages/auth";
import {
  ChallengeCreator,
  ChallengeFeed,
  ChallengeSubmissions,
  ChallengeSubmission,
  ProfilePage,
  BoostRewardPage,
  EditProfile,
  SettingsScreen,
  TopUpPage,
  PublicProfile,
  NotificationsScreen,
} from "@/pages/game";
import { Toaster } from "@/components/ui/toaster";
import { authStore } from "./store/authstore";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {
  CheckoutForm,
  CompletePage,
  TransactionHistory,
  WithdrawalForm,
} from "./pages/payment";
import { getToken } from "./services/getToken";
import { getItemFromLocalStorage } from "./services/localStorage";
import { TOKEN, USER_DATA } from "./constants/keys";

function App() {
  // Make sure to call loadStripe outside of a component’s render to avoid
  // recreating the Stripe object on every render.
  // This is a public sample test API key.
  // Don’t submit any personally identifiable information in requests made with this key.
  // Sign in to see your own test API key embedded in code samples.
  const stripePromise = loadStripe(
    "pk_test_51Qc31ZCYjeTr7iKH3najWXrQeUqf2AEU2YJ4q8T6iudU9fTdbyixcTVK3TGVPWwIiKPtgJP7K1KoOHx3TP4ea6Mv00uFbXc7u4"
  );
  const authToken = getToken();
  const { token, user, updateToken, updateUser } = authStore();

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
      body: JSON.stringify({ amount: 50, paymentMethodId: "pm_card_visa" }),
    })
      .then((res) => res.json())
      // .then((data) => console.log(data));
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  useEffect(() => {
    if (!token) {
      const newToken = getItemFromLocalStorage(TOKEN);
      updateToken(newToken);
      console.log("reload", newToken);
    }
    if (!user) {
      const newUser = getItemFromLocalStorage("USER_DATA");
      updateUser(newUser);
      console.log("reload", newUser);
    }
  });

  const appearance = {
    theme: "stripe",
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = "auto";
  function RequireAuth({
    children,
    redirectTo,
  }: {
    children: React.ReactNode;
    redirectTo: string;
  }) {
    console.log(token);
    return token ? children : <Navigate to={redirectTo} replace={true} />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/otp/:phone" element={<OTPVerification />} />
        <Route path="/username/:phone" element={<UsernameSetup />} />
        {/* protected routes start here */}
        <Route path="/challenge" element={<ChallengeFeed />} />
        <Route path="/create" element={<ChallengeCreator />} />
        <Route path="/review-panel" element={<ChallengeSubmissions />} />
        <Route path="/submission" element={<ChallengeSubmission />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/boost-reward" element={<BoostRewardPage />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/settings" element={<SettingsScreen />} />
        <Route path="/top-up" element={<TopUpPage />} />
        <Route path="/public-profile" element={<PublicProfile />} />
        <Route path="/notifications" element={<NotificationsScreen />} />
        <Route path="/transactions" element={<TransactionHistory />} />
        <Route
          path="/boost-reward"
          element={
            <RequireAuth redirectTo="/">
              <BoostRewardPage />
            </RequireAuth>
          }
        />

        {/* <Route
          path="/Genealogy"
          element={
            <RequireAuth redirectTo="/Login">
              <Genealogy />
            </RequireAuth>
          }
        />
        <Route
          path="/AddMember"
          element={
            <RequireAuth redirectTo="/Login">
              <AddMember />
            </RequireAuth>
          }
        />  */}
        {/* <Route
          path="/AddParents/:id"
          element={
            <RequireAuth redirectTo="/Login">
              <AddParents />
            </RequireAuth>
          }
        /> */}
      </Routes>{" "}
      {clientSecret && (
        <Elements
          options={{ clientSecret, appearance, loader }}
          stripe={stripePromise}
        >
          <Routes>
            <Route path="/checkout" element={<CheckoutForm />} />
            <Route path="/complete" element={<CompletePage />} />
            <Route path="/withdrawal" element={<WithdrawalForm />} />
          </Routes>
        </Elements>
      )}
      <Toaster />
    </>
  );
}

export default App;
