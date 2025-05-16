import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedLayout: React.FC = () => {
  const { loggedIn } = useAuth();

  if (!loggedIn) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};
