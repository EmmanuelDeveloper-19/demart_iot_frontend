import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../services/AuthContext";

const PrivateRoute = ({ requiredRole }) => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/" />;
  }

  if (requiredRole && user?.rol !== requiredRole) {
    return <Navigate to="/dashboard/pageNotFound" />;
  }

  return <Outlet />;
};

export default PrivateRoute;