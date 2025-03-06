import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../services/AuthContext"; 

const UserProfile = () => {
  const { userProfile} = useContext(AuthContext); 

  return (
    <div className="user-profile-container">
        <div className="user-profile">
          <h2>Perfil de Usuario</h2>
          <p><strong>Nombre:</strong> {userProfile?.name} {userProfile?.lastname}</p>
          <p><strong>Teléfono:</strong> {userProfile?.phone}</p>
          <p><strong>Dirección:</strong> {userProfile?.address}</p>
            <img
              src={userProfile.foto_perfil}
              alt="Foto de perfil"
              className="profile-photo"
            />
        </div>
    </div>
  );
};

export default UserProfile;
