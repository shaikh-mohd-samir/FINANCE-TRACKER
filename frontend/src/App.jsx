import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Navbar from "./components/Navbar";

import Signup from "./pages/SignUp";
import Signin from "./pages/SignIn";
import VerifyOtp from "./pages/VerifyOTP";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

/* 🔐 Protected Route */
function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/signin" replace />;
}

/* 🌍 All Routes */
function AppRoutes() {
  const { user } = useAuth();

  return (
    <>
      {/* Navbar only after login */}
      {user && <Navbar />}

      <Routes>
        {/* 👤 Public Routes */}
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset" element={<ResetPassword />} />

        {/* 🔒 Protected Routes */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        {/* 🧭 Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

/* 🚀 App Entry */
export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}