import React from "react";
import { Route, Routes } from "react-router-dom";
import Prototype from "../pages/prototype/prototype";
import HistoricData from "../pages/historicData/historicData";
import RecopileData from "../pages/recopileData/recopileData";
import Settings from "../pages/settings/settings";
import UserProfile from "../pages/users/userProfile";
import ChangePassword from "../pages/auth/changePassword";
import Home from "../pages/home/home";

const UserRoutes = () => {
    return (
        <>
            <Route path="home" element={<Home />} />
            <Route path="prototype" element={<Prototype />} />
            <Route path="historicData" element={<HistoricData />} />
            <Route path="recopileData" element={<RecopileData />} />
            <Route path="settings" element={<Settings />} />
            <Route path="changePassword" element={<ChangePassword />} />
            <Route path="userProfile" element={<UserProfile />} />
        </>
    );
};

export default UserRoutes;