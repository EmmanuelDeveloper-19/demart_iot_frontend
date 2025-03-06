import React from 'react';
import Sidebar from '../components/common/sidebar';
import Navbar from '../components/common/navbar';
import { Outlet } from 'react-router-dom'; 

const MainLayout = () => {
    return (
      <div className="dashboard">
        <Sidebar />
        <div className="main-area">
          <Navbar />
          <main class="content">
            <Outlet />
          </main>
        </div>
      </div>
    );
};

export default MainLayout;