import React, { useState, useContext, useCallback } from "react";
import "../../index.css"; // Asegúrate de tener tu archivo CSS con estilos
import { Link, useNavigate } from "react-router-dom"; // Importa useNavigate
import Modal from '../../components/common/modal';
import { AuthContext } from "../../services/AuthContext";
import axios from "axios";

const UsersTable = () => {
  const { users, updateUserRole, fetchUsers, deleteUser } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Lógica de paginación
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false); // Nuevo estado para manejar la actualización

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  let navigate = useNavigate();

  const handleUser = () => {
    navigate("/dashboard/viewUser");
  }

  // Llamada para actualizar el rol
  const handleUpdateRole = async () => {
    if (!selectedUser) return;

    try {
      const response = await updateUserRole(selectedUser.id, newRole);
      if (response) {
        // Cerrar modal y resetear estados
        setModalOpen(false);
        setSelectedUser(null);
        setNewRole("");
        
        // Marcar que la actualización se realizó con éxito
        setIsUpdated(true);
        
        // Refrescar la lista de usuarios
        fetchUsers();
      }
    } catch (error) {
      console.error("Error al actualizar el rol", error);
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    try {
      const response = await deleteUser(selectedUser.id);
      if (response) {
        setModalOpen2(false);
        setSelectedUser(null);

        setIsUpdated(true);
        
        fetchUsers();
      }
    } catch (error){
      console.log("Error al eliminar usuario", error);
    }
  };

  // Ejecutar efecto cuando la actualización se haya realizado
  React.useEffect(() => {
    if (isUpdated) {
      // Una vez que se actualiza el estado, recarga la página
      window.location.reload();
    }
  }, [isUpdated]);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2 className="text-2xl font-bold text-center mb-4">Gestión de Usuarios</h2>
        </div>
        <div className="col">
          <Link to="/dashboard/addUser" className="btn btn-primary">Agregar Usuario</Link>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Nombre</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Rol</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{indexOfFirstUser + index + 1}</td>
              <td className="border px-4 py-2">{`${user.first_name} ${user.last_name}`}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.role}</td>
              <td className="row">
                <Link to={`/dashboard/viewUser/${user.id}`} className="btn btn-success" onClick={handleUser}>Ver</Link>
                <button
                  className="btn btn-warning"
                  onClick={() => {
                    setSelectedUser(user);
                    setNewRole(user.role);
                    setModalOpen(true);
                  }}>
                  Actualizar
                </button>
                <button className="btn btn-danger"
                  onClick={() => {
                    setSelectedUser(user);
                    setModalOpen2(true);
                  }}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <div className="flex justify-center mt-4">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="btn-pagination">
          Anterior
        </button>
        <span className="mx-2">Página {currentPage}</span>
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage * usersPerPage >= users.length} className="btn-pagination">
          Siguiente
        </button>
      </div>

      {/* Modal para actualizar rol */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Actualizar Rol">
        <p>Selecciona el nuevo rol para {selectedUser?.first_name}:</p>
        <div className="form-group">
          <select value={newRole} onChange={(e) => setNewRole(e.target.value)} className="form-select">
            <option value="admin">Administrador</option>
            <option value="editor">Editor</option>
            <option value="user">Usuario</option>
          </select>
        </div>

        <div className="row">
          <button
            className="btn btn-info"
            onClick={handleUpdateRole}>Aceptar</button>
          <button
            className="btn btn-danger"
            onClick={() => setModalOpen(false)}>Cerrar</button>
        </div>
      </Modal>

      {/* Modal para eliminar usuario*/}
      <Modal isOpen={modalOpen2} onClose={() => setModalOpen2(false)} title="Eliminar usuario">
        <p>¿Estas seguro de eliminar este usuario</p>
        <div className="row">
          <button
            className="btn btn-info"
            onClick={handleDeleteUser}>Aceptar</button>
          <button
            className="btn btn-danger"
            onClick={() => setModalOpen2(false)}>
            Cancelar
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default UsersTable;
