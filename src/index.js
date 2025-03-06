import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import AuthProviderWrapper from "./services/AuthProviderWrapper";
import Rutas from "./routes/routes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <AuthProviderWrapper>
        <Rutas />
      </AuthProviderWrapper>
    </Router>
  </React.StrictMode>
);
