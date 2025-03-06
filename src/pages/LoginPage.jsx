import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";
import { AuthContext } from "../services/AuthContext";

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const success = await loginUser(username, password);
      if (success) {
        navigate("/dashboard");
      } else {
        setError("Usuario o contraseña incorrectos");
      }
    } catch (err) {
      setError("Error en el servidor. Intente nuevamente.");
    }
  };

  return (
    <div className="body-form">
      <div className="login-form">
        <h2>DEMART-IOT</h2>
        <p>Detección de metales pesados en aguas residuales mediante el uso del Internet de las cosas</p>
        <br />
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Usuario:</label>
            <input
              type="text"
              placeholder="Ingrese su usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          <div className="forgot-password">
            <Link to="/recovery">¿Olvidaste tu contraseña?</Link>
          </div>
          <button className="btn btn-primary" type="submit">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;