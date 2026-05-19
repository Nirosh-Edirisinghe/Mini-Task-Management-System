import React from 'react'
import { Outlet } from "react-router-dom";
import Sidebar from '../components/Sidebar.jsx';

const AppLayout = () => {
  return (
    <>
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Content */}
        <div className="flex-1 p-6 bg-gray-100">
          <Outlet />
        </div>
      </div>

    </>
  )
}

export default AppLayout
