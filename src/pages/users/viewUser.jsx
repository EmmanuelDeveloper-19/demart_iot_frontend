import { Link } from "react-router-dom";

const ViewUser = () => {
    return (
        <div className="container">
            <div className="breadcrumb">
                <p>
                    <Link to="/dashboard/usuarios" className="breadcrumb-link">Usuarios</Link> / Datos del usuario
                </p>
            </div>

            <h2 className="title">Información del Usuario</h2>

            <div className="user-card">
                <p><strong>Nombre:</strong> Juan Pérez</p>
                <p><strong>Email:</strong> juanperez@mail.com</p>
                <p><strong>Rol:</strong> Administrador</p>
                <p><strong>Teléfono:</strong> +52 55 1234 5678</p>
                <p><strong>Dirección:</strong> Calle Falsa 123, CDMX</p>
                <p><strong>Fecha de Incorporación:</strong> 01/01/2022</p>
                <p><strong>Última Vez que Ingresó:</strong> 20/02/2025</p>
                <p><strong>Estatus:</strong> Activo</p>
            </div>
        </div>
    );
};

export default ViewUser;
