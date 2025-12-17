import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function PrivateRoute({ children }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/signin" replace />;

  return children;
}