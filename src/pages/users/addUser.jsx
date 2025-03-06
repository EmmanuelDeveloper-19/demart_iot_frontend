import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { AuthContext } from "../../services/AuthContext"


const AddUser = () => {
    const { registerUser } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
  
    // Función para manejar el envío del formulario
    const handleRegister = async (e) => {
      e.preventDefault();
  
      // Validar que todos los campos estén llenos
      if (!username || !password || !name || !lastname || !phone || !address) {
        setError("Todos los campos son obligatorios");
        return;
      }
      try {
        // Llamar a la función registerUser del AuthContext
        await registerUser(username, password, name, lastname, phone, address);
  
        // Mostrar mensaje de éxito
        setSuccess("Usuario registrado exitosamente");
        setError("");
  
        // Limpiar el formulario
        setUsername("");
        setPassword("");
        setName("");
        setLastname("");
        setPhone("");
        setAddress("");
      } catch (error) {
        // Manejar errores
        setError("Error al registrar el usuario. Inténtalo de nuevo.");
        setSuccess("");
        console.error("Error al registrar:", error);
      }
    };
  

    return (
        <div className="container">
            <div className="breadcrumb">
                <p>
                    <Link to="/dashboard/usuarios" className="breadcrumb-link">Usuarios</Link> / Agregar nuevo usuario
                </p>
            </div>
            <br />
            <div className="col-md-12">
                <div className="">
                    <h1>Datos Personales</h1>
                    {error && <p className="error">{error}</p>}
                    {success && <p className="success">{success}</p>}

                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={(e)=> setName(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="apellido">Apellido</label>
                            <input
                                type="text"
                                id="lastname"
                                name="lastname"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="username"
                                name="username"
                                value={username}
                                onChange={(e)=> setUsername(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="telefono">Teléfono</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={phone}
                                onChange={(e)=>setPhone(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="direccion">Dirección</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={address}
                                onChange={(e)=> setAddress(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Contraseña</label>
                            <input 
                                type="password"
                                id="passowrd"
                                name="password"
                                value={password}
                                onChange={(e)=> setPassword(e.target.value)}
                             />
                        </div>
                        <button type="submit" className="btn btn-primary">Enviar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddUser;
