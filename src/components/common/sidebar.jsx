import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../services/AuthContext";
import "../../index.css";

const Sidebar = () => {
  const { isSuperuser, userProfile, logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-profile">
        <h1>SIDEMPAR</h1>
        <Link to="userProfile" className="perfil" style={{ textDecoration: "none", color: "white" }}>
          {userProfile?.foto_perfil ? (
            <img
              src={userProfile.foto_perfil}  
              alt="Foto de perfil"
              width={"70px"}
              height={"70px"}
              style={{ borderRadius: "50%", objectFit:"cover"}}
            />
          ) : (
            <img
              src="https://i.pinimg.com/736x/9f/0a/ef/9f0aef589177d7b2221cf850b20bdfe4.jpg"
              alt="Foto de perfil por defecto"
              width={"50px"}
              style={{ borderRadius: "50%" }}
            />
          )}
          <div className="user-info-sidebar">
            <p>Hola </p>
            <p className="name">{user ? user.username : "Usuario"}</p>
          </div>
        </Link>
      </div>
      <br />
      <ul>
        <li>
          <Link to="home"><i className="fas fa-home"></i> Inicio</Link>
        </li>
        {isSuperuser ? ( 
        <li>
          <Link to="usuarios"><i className="fas fa-users"></i> Usuarios</Link>
        </li>
        ): null}
        <li>
          <Link to="prototype"><i className="fas fa-cogs"></i> Prototipo</Link>
        </li>
        <li>
          <Link to="historicData"><i className="fas fa-history"></i> Datos históricos</Link>
        </li>
        <li>
          <Link to="recopileData"><i className="fas fa-database"></i> Datos recopilados</Link>
        </li>
      </ul>

      <div className="under-content">
        <ul>
          <li>
            <Link to="settings"><i className="fas fa-cogs"></i> Configuración</Link>
          </li>
          <li>
            <Link onClick={handleLogout} style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}>
              <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;