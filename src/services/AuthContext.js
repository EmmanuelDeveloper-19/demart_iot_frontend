import React, { createContext, useState, useEffect, useReducer, useCallback } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

// Crea el contexto de la autenticación
export const AuthContext = createContext();

// Estado inicial
const initialState = {
  user: null,
  userProfile: null,
  users: [],
  error: "",
  success: "",
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload, userProfile: action.payload };
    case "LOGOUT":
      return { ...initialState };
    case "SET_USERS":
      return { ...state, users: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_SUCCESS":
      return { ...state, success: action.payload };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // Función para iniciar sesión
  const login = useCallback(async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
      const { token, user } = response.data;
      localStorage.setItem("token", token); // Guardar token en localStorage
      dispatch({ type: "LOGIN", payload: user });
      return true;
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Error al iniciar sesión" });
      return false;
    }
  }, []);

  // Función para cerrar sesión
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  }, []);

  // Función para verificar el rol del usuario
  const isSuperuser = useCallback(() => {
    return state.user?.role === "admin"; // Accede a state.user
  }, [state.user]); // Dependencia correcta

  // Función para obtener todos los usuarios
  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "SET_USERS", payload: response.data });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Error al obtener usuarios" });
    }
  }, [token]);

  // Función para agregar un usuario
  const register = useCallback(async (userData) => {
    try {
      await axios.post(`${API_BASE_URL}/register`, userData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: "SET_SUCCESS", payload: "Usuario registrado con éxito" });
      fetchUsers(); // Actualizar la lista de usuarios después de registrar uno nuevo
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Hubo un problema al registrar al usuario" });
    }
  }, [token, fetchUsers]);

  // Obtener usuario por ID
  const getUserById = useCallback(async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Error al obtener el usuario" });
      return null;
    }
  }, [token]);

  // Función para actualizar el rol del usuario
  const updateUserRole = useCallback(async (userId, newRole) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/users/${userId}/role`,
        {
          role: newRole,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Error al actualizar el rol" });
      return null;
    }
  }, [token]);

  const deleteUser = useCallback(async (userId) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/users/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}`}
        }
      );
      return response.data;
    } catch (error) {
      dispatch({type: "SET_ERROR", payload: "Error al eliminar el usuario"});
      return null
    }
  }, [token]);

  // Obtener los datos del usuario usando el token (una sola vez)
  useEffect(() => {
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userId = decodedToken.id;

      axios
        .get(`${API_BASE_URL}/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          dispatch({ type: "LOGIN", payload: response.data });
          setLoading(false); // Finaliza la carga
        })
        .catch((error) => {
          dispatch({ type: "SET_ERROR", payload: "No se pudo obtener los datos del usuario" });
          setLoading(false); // Finaliza la carga
        });

      fetchUsers(); // Cargar la lista de usuarios
    } else {
      setLoading(false); // Finaliza la carga si no hay token
    }
  }, [token, fetchUsers]);

  if (loading) {
    return <div>Loading...</div>; // Muestra un spinner o algo similar mientras carga
  }

  // Valor proporcionado por el contexto
  const contextValue = {
    user: state.user,
    users: state.users,
    userProfile: state.userProfile,
    error: state.error,
    success: state.success,
    login,
    logout,
    isSuperuser,
    register,
    getUserById,
    updateUserRole,
    deleteUser
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
