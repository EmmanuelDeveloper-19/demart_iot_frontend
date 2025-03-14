import React, { useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";  // Importa useNavigate
import "../styles/login.css";
import { AuthContext } from "../services/AuthContext";

const LoginPage = () => {
  // Obtener la función de login del contexto
  const { login } = useContext(AuthContext);

  // Estados para manejar el formulario y errores
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Hook para redireccionar
  const navigate = useNavigate();

  // Función para manejar el envío del formulario
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError(""); // Limpiar mensaje de error

      try {
        const success = await login(email, password); // Intentar iniciar sesión
        if (success) {
          navigate("/dashboard"); // Redirigir al dashboard si el login es exitoso
        } else {
          setError("Usuario o contraseña incorrectas"); // Mostrar error si el login falla
        }
      } catch (err) {
        console.error("Error en el servidor", err);
        setError("Error en el servidor. Inténtelo de nuevo más tarde.");
      }
    },
    [email, password, login, navigate] // Dependencias de useCallback
  );

  return (
    <div className="body-form">
      <div className="login-form">
        <h2>DEMART-IOT</h2>
        <p>
          Detección de metales pesados en aguas residuales mediante el uso del
          Internet de las cosas
        </p>
        <br />
        <form onSubmit={handleSubmit}>
          <div>
            <label>Usuario:</label>
            <input
              type="text"
              placeholder="Ingrese su usuario"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Contraseña:</label>
            <input
              type="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <br />
            <a className="forgot-password" href="/recovery">¿Olvidaste tu contraseña?</a>
          {error && <p className="error-message">{error}</p>} {/* Mostrar mensaje de error */}
          <button className="btn btn-primary" type="submit">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;