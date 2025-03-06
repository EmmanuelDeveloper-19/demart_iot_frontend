import React, { useState, useEffect, useContext } from 'react';
import "../../index.css"; // Asegúrate de tener tu archivo CSS con estilos
import { Link, useNavigate } from "react-router-dom"; // Importa useNavigate
import Modal from '../../components/common/modal';
import { AuthContext } from "../../services/AuthContext";
import axios from "axios";

const UsersTable = () => {
  const { users} = useContext(AuthContext);

 return (
    <div className="container">
      <h2 className="text-center mb-4">Lista de Usuarios</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>         
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.is_superuser ? "Admin" : "User"}</td>
              
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No hay usuarios disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;

/*
 const [users] = useState([
    { id: 1, name: 'Juan Pérez', email: 'juan@mail.com', role: 'Admin' },
    { id: 2, name: 'Ana García', email: 'ana@mail.com', role: 'User' },
    { id: 3, name: 'Carlos López', email: 'carlos@mail.com', role: 'User' },
    { id: 4, name: 'Luisa Rodríguez', email: 'luisa@mail.com', role: 'Admin' },
    { id: 5, name: 'Pedro Martínez', email: 'pedro@mail.com', role: 'User' },
    { id: 6, name: 'Sofia Hernández', email: 'sofia@mail.com', role: 'Admin' },
    { id: 7, name: 'Marco Silva', email: 'marco@mail.com', role: 'User' },
    { id: 8, name: 'Elena Fernández', email: 'elena@mail.com', role: 'Admin' },
    { id: 9, name: 'David Gómez', email: 'david@mail.com', role: 'User' },
    { id: 10, name: 'Marta López', email: 'marta@mail.com', role: 'Admin' },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Lógica de paginación
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  let navigate = useNavigate();

  const handleUser = () => {
    navigate("/dashboard/viewUser");
  }

  const [modalOpen, setModalOpen] = useState(false);

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
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.role}</td>
              <td className="row">
                <Link to="/dashboard/viewUser" className="btn btn-info" onClick={handleUser}>Ver</Link>
                <button className="btn btn-warning" onClick={() => setModalOpen(true)}>Actualizar</button>
                <button className="btn btn-danger">Eliminar</button>
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

      <button className="btn btn-warning" onClick={() => {
        console.log("Boton clickeado");
        setModalOpen(true);}}>Actualizar</button>

        <button onClick={()=> {console.log("Hola")}}>Hola</button>


      <Modal
      isOpen={modalOpen}
      onClose={() => setModalOpen(false)}
      title="Eliminar usuario"
      >
        <p>¿Estas seguro de eliminar este usuario?</p>
      </Modal>
    </div>
  );
};
*/