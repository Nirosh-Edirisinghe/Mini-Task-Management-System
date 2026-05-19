import React, { useState } from 'react'
import { Outlet } from "react-router-dom";
import Sidebar from '../components/Sidebar.jsx';
import { Menu } from "lucide-react";

const AppLayout = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="flex h-screen bg-slate-200 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Content */}
        <div className="flex-1 flex flex-col">
          {/* Top bar for mobile screen */}
          <div className="lg:hidden flex justify-between bg-linear-to-br from-[#021B1F] to-[#0B3A42] text-white pr-4 py-1 shadow">
            <h1 className="font-semibold">
              📋 TaskFlow Pro
            </h1>
            <button onClick={() => setSidebarOpen(true)} className="text-slate-700">
              <Menu size={24} />
            </button>
          </div>

          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>

    </>
  )
}

export default AppLayout
