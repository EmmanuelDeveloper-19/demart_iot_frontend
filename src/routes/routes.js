import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MainLayout from '../layout/MainLaoyut';
import LoginPage from '../pages/LoginPage';
import Home from '../pages/home/home';
import Usuarios from '../pages/users/usuarios';
import AddUser from '../pages/users/addUser';
import Prototype from '../pages/prototype/prototype';
import HistoricData from '../pages/historicData/historicData';
import RecopileData from '../pages/recopileData/recopileData';
import Settings from '../pages/settings/settings';
import UserProfile from '../pages/users/userProfile';
import RecoveryPassword from '../pages/auth/recoveryPassword';
import ViewUser from '../pages/users/viewUser';
import ChangePassword from "../pages/auth/changePassword";
import PrivateRoute from "../context/PrivateRoutes";
import PageNotFound from "../pages/error/404";
import AuthContext from "../services/AuthContext";

function Rutas() {
    const { user } = useContext(AuthContext);

    return (
        <Routes>
            {/* Ruta pública */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/recovery" element={<RecoveryPassword />} />

            {/* Rutas protegidas */}
            <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="home" element={<Home />} />
                    <Route element={<PrivateRoute requiredRole="admin" />}>
                        <Route path="usuarios" element={<Usuarios />} />
                    </Route>
                    <Route path="addUser" element={<AddUser />} />
                    <Route path="viewUser/:userId" element={<ViewUser />} />
                    <Route path="prototype" element={<Prototype />} />
                    <Route path="historicData" element={<HistoricData />} />
                    <Route path="recopileData" element={<RecopileData />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="changePassword" element={<ChangePassword />} />
                    <Route path="userProfile" element={<UserProfile />} />
                    <Route path="pageNotFound" element={<PageNotFound />} />
                    <Route path="*" element={<PageNotFound />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default Rutas;
