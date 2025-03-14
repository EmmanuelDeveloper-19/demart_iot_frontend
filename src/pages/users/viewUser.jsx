import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthContext from "../../services/AuthContext";
import UserProfile from "./userProfile";

const ViewUser = () => {
    const { userId } = useParams(); // Obtener el ID del usuario desde la URL
    const { getUserById } = useContext(AuthContext);
    const [userDetails, setUserDetails] = useState(null); // Estado para almacenar los detalles del usuario
    const [loading, setLoading] = useState(true); // Estado de carga

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUserById(userId); // Obtener el usuario por ID
            if (user) {
                setUserDetails(user); // Si la respuesta es válida, establecer los detalles
            }
            setLoading(false); // Cambiar el estado de carga
        };

        fetchUser();
    }, [userId, getUserById]);

    if (loading) {
        return <div>Cargando...</div>; // Mostrar un mensaje de carga mientras los datos se obtienen
    }

    const formatDate = (dateString) => {
        if (!dateString || dateString.startsWith("0001-01-01")) return "Nunca ha ingresado"; // Manejo de la fecha vacía
        
        return new Date(dateString).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZoneName: "short"
        });
    };
    


    return (
        <div className="container">
            <div className="breadcrumb">
                <p>
                    <Link to="/dashboard/usuarios" className="breadcrumb-link">Usuarios</Link> / Datos del usuario
                </p>
            </div>

            <h2 className="title">Información del Usuario</h2>

            <div className="user-card">
                <div className="profile-image-wrapper">
                    {userDetails?.profile_picture? (
                        <img src={userDetails.profile_picture} alt="" className="profile-image" />
                    ): (
                        null
                    )}
                </div>
                <p><strong>Nombre:</strong> {userDetails.first_name} {userDetails.last_name}</p>
                <p><strong>Email:</strong> {userDetails.email}</p>
                <p><strong>Rol:</strong> {userDetails.role}</p>
                <p><strong>Teléfono:</strong> {userDetails.phone}</p>
                <p><strong>Fecha de Incorporación:</strong> {formatDate(userDetails.created_at)}</p>
                <p><strong>Última Vez que Ingresó:</strong> {formatDate(userDetails.last_login)}</p>
                <p><strong>Última vez que se actualizo un campo: </strong>{formatDate(userDetails.updated_at)}</p>
            </div>
        </div>
    );
};

export default ViewUser;
