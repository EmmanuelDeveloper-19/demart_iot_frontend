import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { AuthContext } from "../../services/AuthContext"


const AddUser = () => {
    const { register, success, error } = useContext(AuthContext);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("");
    const [address, setAddress] = useState({
        street: '',
        city: '',
        state: '',
        country: '',
        zip: ''
    });

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const userData = {
            first_name: firstName,
            last_name: lastName,
            email, 
            password,
            phone,
            role,
            address,
        };

        register(userData);
    };

    if (success){
        navigate('/dashboard/usuarios');
    }

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

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={firstName}
                                onChange={(e)=> setFirstName(e.target.value)}
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
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
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
                                value={email}
                                onChange={(e)=> setEmail(e.target.value)}
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
                            <label htmlFor="telefono">Contraseña</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <br />
                        <h3>Dirección</h3>
                        <br />
                        <div className="form-group">
                            <label htmlFor="direccion">Calle</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={address.street}
                                onChange={(e)=> setAddress({ ...address, street: e.target.value})}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="direccion">Ciudad</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={address.city}
                                onChange={(e)=> setAddress({ ...address, city: e.target.value})}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="direccion">Estado</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={address.state}
                                onChange={(e)=> setAddress({ ...address, state: e.target.value})}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="direccion">País</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={address.country}
                                onChange={(e)=> setAddress({ ...address, country: e.target.value})}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="direccion">Código postal</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={address.zip}
                                onChange={(e)=> setAddress({ ...address, zip: e.target.value})}
                                className="form-control"
                                required
                            />
                        </div>

                        <br />
                        <h3>Rol</h3>
                        <div className="form-group">
                            <label htmlFor="password">Contraseña</label>
                            <select name="role" id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="admin">Administrador</option>
                                <option value="user">Usuario normal</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Enviar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddUser;
