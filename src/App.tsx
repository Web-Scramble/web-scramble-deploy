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
import { useLocation } from 'react-router'
import {
  CheckoutForm,
  CompletePage,
  TopUp,
  TransactionHistory,
  WithdrawalForm,
} from "./pages/payment";
import { getToken } from "./services/getToken";
import { getItemFromLocalStorage } from "./services/localStorage";
import { TOKEN, USER_DATA } from "./constants/keys";
import { intentStore } from "./store/intentStore";

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
  const {clientSecret} = intentStore()

  // const [clientSecret, setClientSecret] = useState("");
  // const baseURL = import.meta.env.VITE_API_URL;
  // useEffect(() => {
  //   // Create PaymentIntent as soon as the page loads
  //   fetch(`${baseURL}payment/refill`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${authToken}`,
  //     },
  //     body: JSON.stringify({ amount: 50, paymentMethodId: "pm_card_visa" }),
  //   })
  //     .then((res) => res.json())
  //     // .then((data) => console.log(data));
  //     .then((data) => setClientSecret(data.clientSecret));
  // }, []);

  useEffect(() =>{
    const getSavedToken = async()=>{

      const oldToken = await getItemFromLocalStorage(TOKEN);
      if(oldToken){
        updateToken(oldToken);
      }
      console.log("reload", oldToken,authToken);
      const oldUser = await getItemFromLocalStorage(USER_DATA);
      if (oldUser) {
        updateUser(oldUser);
        console.log("reloaduser", oldUser);
      }
    }
    getSavedToken()
  },[]);

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
    const {token} = authStore()
    const location = useLocation();
    console.log(token);
    return token ? children : <Navigate to={redirectTo} replace={true} state={{ path: location.pathname }} />;
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
        {/* <Route path="/profile" element={<ProfilePage />} /> */}
        {/* <Route path="/boost-reward" element={<BoostRewardPage />} /> */}
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/settings" element={<SettingsScreen />} />
        <Route path="/top-up" element={<TopUpPage />} />
        <Route path="/public-profile" element={<PublicProfile />} />
        <Route path="/notifications" element={<NotificationsScreen />} />
        <Route path="/transactions" element={<TransactionHistory />} />
        <Route
          path="/challenge"
          element={
            <RequireAuth redirectTo= {"/auth"}>
              <ChallengeFeed />
            </RequireAuth>
          }
        />
          <Route
          path="/profile"
          element={
            <RequireAuth redirectTo="/">
              <ProfilePage />
            </RequireAuth>
          }
        />
        {/* <Route
          path="/create"
          element={
            <RequireAuth redirectTo="/">
              <ChallengeCreator />
            </RequireAuth>
          }
        />
        <Route
          path="/review-panel"
          element={
            <RequireAuth redirectTo="/">
              <ChallengeSubmissions />
            </RequireAuth>
          }
        />
        <Route
          path="/submission/:challengeId"
          element={
            <RequireAuth redirectTo="/">
              <ChallengeSubmission />
            </RequireAuth>
          }
        />
      
        <Route
          path="/edit-profile"
          element={
            <RequireAuth redirectTo="/">
              <EditProfile />
            </RequireAuth>
          }
        />
        <Route
          path="/settings"
          element={
            <RequireAuth redirectTo="/">
              <SettingsScreen />
            </RequireAuth>
          }
        />
        <Route
          path="/top-up"
          element={
            <RequireAuth redirectTo="/">
              <TopUpPage />
            </RequireAuth>
          }
        />
        <Route
          path="/notifications"
          element={
            <RequireAuth redirectTo="/">
              <NotificationsScreen />
            </RequireAuth>
          }
        />
        <Route
          path="/transactions"
          element={
            <RequireAuth redirectTo="/">
              <TransactionHistory />
            </RequireAuth>
          }
        />
        <Route
          path="/public-profile"
          element={
            <RequireAuth redirectTo="/">
              <PublicProfile />
            </RequireAuth>
          }
        /> */}
            <Route path="/checkout" element={<TopUp />} />
            <Route path="/complete" element={<CompletePage />} />
            <Route path="/withdrawal" element={<WithdrawalForm />} />
      </Routes>
        
     
      <Toaster />
    </>
  );
}

export default App;
