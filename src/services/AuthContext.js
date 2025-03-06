import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children, navigate }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
  );
  const [userProfile, setUserProfile] = useState(null);
  const [isSuperuser, setIsSuperuser] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchUserProfile = async () => {
    if (!authTokens) {
      console.error("No hay tokens de autenticación disponibles.");
      return;
    }

    try {
      const response = await axios.get("http://127.0.0.1:8000/auth/user-profile/", {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
      setUserProfile(response.data);
      setIsSuperuser(response.data.is_superuser);
    } catch (error) {
      console.error("Error obteniendo el perfil del usuario:", error.response?.data || error.message);
    }
  };

  const fetchUsers = async () => {
    if (!authTokens) {
      console.error("No hay tokens de autenticación disponibles.");
      return;
    }

    try {
      const response = await axios.get("http://127.0.0.1:8000/auth/listar_usuarios/", {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error obteniendo la lista de usuarios:", error.response?.data || error.message);
    }
  };

  const isTokenExpired = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Corregido: debe dividirse por 1000
      return decodedToken.exp < currentTime;
    } catch (error) {
      console.error("Error al decodificar el token: ", error);
      return true;
    }
  };

  useEffect(() => {
    if (authTokens) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${authTokens.access}`;
      fetchUserProfile();
      fetchUsers();

      if (isTokenExpired(authTokens.access)) {
        alert("Tu sesión ha expirado. Debes iniciar sesión nuevamente.");
        logoutUser();
      }
    }
  }, [authTokens]);

  const loginUser = async (username, password) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/login/", {
        username,
        password,
      });

      if (response.data.status === "success") {
        localStorage.setItem("authTokens", JSON.stringify(response.data));
        localStorage.setItem("user", JSON.stringify({ username }));
        setAuthTokens(response.data);
        setUser({ username });

        const decodedToken = JSON.parse(atob(response.data.access.split(".")[1]));
        setIsSuperuser(decodedToken.is_superuser);
        await fetchUserProfile();
        return true;
      } else {
        throw new Error("Error en la autenticación");
      }
    } catch (error) {
      console.error("Error en loginUser:", error);
      return false;
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    setUserProfile(null);
    setUsers([]);
    localStorage.removeItem("authTokens");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];

    if (navigate) {
      navigate("/"); // Redirige al login
    } else {
      window.location.href = "/"; // Fallback
    }
  };

  return (
    <AuthContext.Provider value={{ authTokens, user, userProfile, users, isSuperuser, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
