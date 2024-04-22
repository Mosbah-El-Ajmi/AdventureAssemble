import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./auth.js";

const PrivateRoute = () => {
  const user = useAuth();
  if (!user.token) return <Navigate to="/login-or-sign-in" />;
  return <Outlet />;
};

export default PrivateRoute;
