import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import AuthContext from "../../services/AuthContext";

const API_BASE_URL = "http://localhost:3001";

const Settings = () => {
  const { userProfile, updateUser, updateProfilePicture } = useContext(AuthContext);
  const [editedUserProfile, setEditedUserProfile] = useState({
    first_name: userProfile?.first_name || '',
    last_name: userProfile?.last_name || '',
    email: userProfile?.email || '',
    role: userProfile?.role || '',
    phone: userProfile?.phone || '',
    address: userProfile?.address || { street: '', city: '', state: '', country: '', zip: '' },
  });

  const [selectedFile, setSelectedFile] = useState(null); // Para almacenar la imagen seleccionada
  const navigate = useNavigate();

  const cambiarContraseña = () => {
    navigate("/dashboard/changePassword");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserProfile((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = async () => {
    const userId = userProfile?.id;
    try {
        const response = await updateUser(editedUserProfile, userId); // Llamada para actualizar el perfil
        if (response) {
            // Puedes agregar un mensaje de éxito si lo deseas
        }
    } catch (error) {
        console.error("Error al actualizar el perfil", error);
    }
};

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file); // Almacenar la imagen seleccionada
    }
  };

  const handleProfilePictureUpdate = async () => {
    if (selectedFile) {
      try {
        // Actualizar la imagen de perfil
        const updatedUser = await updateProfilePicture(selectedFile);

        // Si la actualización es exitosa, actualiza el perfil completo.
        if (updatedUser) {
          // Actualiza el estado del usuario con la imagen de perfil actualizada
          setEditedUserProfile((prev) => ({
            ...prev,
            profile_picture: updatedUser.profile_picture, // Guarda la imagen de perfil
          }));

          // O puedes llamar a `updateUser` si se requiere enviar todos los datos nuevamente al backend
          const updatedProfile = {
            ...editedUserProfile,
            profile_picture: updatedUser.profile_picture,
          };
          await updateUser(updatedProfile);
        }
      } catch (error) {
        console.error("Error al actualizar la imagen de perfil", error);
      }
    }
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
            {userProfile?.profile_picture ? (
              <img src={`${API_BASE_URL}/${userProfile.profile_picture}`} alt="Perfil" className="profile-image" />
            ) : (
              <img src="" alt="Imagen de perfil" />
            )}
            <label htmlFor="file-input" className="edit-icon">
              <i className="fas fa-camera"></i>
            </label>
            <input
              type="file"
              id="file-input"
              accept="image/*"
              onChange={handleFileChange}
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleProfilePictureUpdate}
            >
              Actualizar foto
            </button>
          </div>
          <h1>Tu información</h1>
        </div>

        <form>
          <div className="form-group">
            <label htmlFor="first_name">Nombre</label>
            <div className="input-container">
              <input
                type="text"
                id="first_name"
                name="first_name"
                className="form-control"
                value={editedUserProfile.first_name}
                onChange={handleInputChange}
              />
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => handleUpdate('first_name')}
              >
                Actualizar
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="last_name">Apellido</label>
            <div className="input-container">
              <input
                type="text"
                id="last_name"
                name="last_name"
                className="form-control"
                value={editedUserProfile.last_name}
                onChange={handleInputChange}
              />
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => handleUpdate('last_name')}
              >
                Actualizar
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-container">
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={editedUserProfile.email}
                onChange={handleInputChange}
              />
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => handleUpdate('email')}
              >
                Actualizar
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="phone">Teléfono</label>
            <div className="input-container">
              <input
                type="text"
                id="phone"
                name="phone"
                className="form-control"
                value={editedUserProfile.phone}
                onChange={handleInputChange}
              />
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => handleUpdate('phone')}
              >
                Actualizar
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="address">Dirección</label>
            <div className="input-container">
              <input
                type="text"
                id="address"
                name="address"
                className="form-control"
                value={editedUserProfile.address.street}
                onChange={handleInputChange}
              />
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => handleUpdate('address')}
              >
                Actualizar
              </button>
            </div>
          </div>

          <button
            className="btn btn-primary"
            onClick={cambiarContraseña}
          >
            Actualizar contraseña
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
