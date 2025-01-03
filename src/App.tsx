import './App.css'
import { Routes, Route } from "react-router";
import { OTPVerification,LandingPage,AuthPage } from './pages/auth';
import { Toaster } from "@/components/ui/toaster"





function App() {
  // function RequireAuth({ children, redirectTo }) {
  //   return token ? children : <Navigate to={redirectTo} replace={true} />;
  // }

  return (
    <>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/otp/:phone" element={<OTPVerification />} />
      {/* <Route path="/" element={<Homepage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route
          path="/MembersTable"
          element={
            <RequireAuth redirectTo="/Login">
              <MembersTable />
            </RequireAuth>
          }
        />
        <Route
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
        /> */}
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
