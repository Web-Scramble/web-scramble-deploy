import './App.css'
import { Routes, Route ,Navigate} from "react-router";
import { OTPVerification,LandingPage,AuthPage,UsernameSetup } from './pages/auth';
import { ChallengeFeed } from './pages/game';
import { Toaster } from "@/components/ui/toaster"
import { authStore } from './store/authstore';





function App() {
  const { token } = authStore();
  function RequireAuth({ children, redirectTo }:{children:React.ReactNode,redirectTo:string}) {
    console.log(token)
    return token ? children : <Navigate to={redirectTo} replace={true} />;
  }

  return (
    <>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/otp/:phone" element={<OTPVerification />} />
      <Route path="/username/:phone" element={<UsernameSetup />} />
      <Route path="/challenge" element={<ChallengeFeed />} />
        {/* <Route
          path="/challenge"
          element={
            <RequireAuth redirectTo="/">
              <ChallengeFeed />
            </RequireAuth>
          }
        /> */}

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
    </Routes>
        <Toaster />
    </>
  )
}

export default App
