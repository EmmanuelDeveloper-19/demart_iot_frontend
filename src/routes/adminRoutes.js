import React from "react";
import { Routes, Route } from "react-router-dom";
import Usuarios from "../pages/users/usuarios"
import AddUser from "../pages/users/addUser";
import ViewUser from "../pages/users/viewUser";

const AdminRoutes = () => {
    return(
        <>
            <Route path="usuarios" element={<Usuarios />}/>
            <Route path="addUser" element={<AddUser />}/>
            <Route path="viewUser/:userId" element={<ViewUser />}/>
        </>
    )
}

export default AdminRoutes;