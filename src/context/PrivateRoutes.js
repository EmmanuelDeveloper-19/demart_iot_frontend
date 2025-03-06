import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../services/AuthContext";

const PrivateRoute = () => {
  const { authTokens } = useContext(AuthContext);

  return authTokens ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
