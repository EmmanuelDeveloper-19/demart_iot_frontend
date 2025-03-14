import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../services/AuthContext";

const Settings = () => {
    const {userProfile} = useContext(AuthContext);

    const navigate = useNavigate();

    const cambiarContraseña = () => {
        navigate("/dashboard/changePassword");
    };

    return (
        <div className="container">
            <div className="breadcrumb">
                <p>
                    <Link to="/dashboard" className="breadcrumb-link">Home</Link> / Configuración
                </p>
            </div>
            <br />
            <div className="col-md-12">
                <div className="profile-container">
                    <div className="profile-image-wrapper">
                        {userProfile?.profile_picture? ( 
                        <img src={userProfile.profile_picture} alt="Perfil" className="profile-image" />
                        ): (
                            <img    
                                src=""
                            />
                        )}
                        <label htmlFor="file-input" className="edit-icon">
                            <i class="fas fa-camera"></i>
                        </label>
                        <input type="file" id="file-input" accept="image/*"  />
                    </div>
                    <h1>Tu información</h1>
                </div>
                <form>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            className="form-control"
                            required
                            disabled
                            value={userProfile?.first_name}
                            color="white"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="apellido">Apellido</label>
                        <input
                            type="text"
                            id="apellido"
                            name="apellido"
                            className="form-control"
                            required
                            disabled
                            value={userProfile?.last_name}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            required
                            disabled
                            value={userProfile?.email}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Rol</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            required
                            disabled
                            value={userProfile?.rol}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="telefono">Teléfono</label>
                        <input
                            type="tel"
                            id="telefono"
                            name="telefono"
                            className="form-control"
                            required
                            disabled
                            value={userProfile?.phone}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="direccion">Dirección</label>
                        <input
                            type="text"
                            id="direccion"
                            name="direccion"
                            className="form-control"
                            required
                            disabled
                            value={`${userProfile?.address?.street}, ${userProfile?.address?.city}, ${userProfile?.address?.state}, ${userProfile?.address?.country}, ${userProfile?.address?.zip}`}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={cambiarContraseña}>Actualizar password</button>
                </form>
            </div>
        </div>
    )
}

export default Settings;