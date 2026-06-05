import React from 'react'
import { LayoutDashboard, AlertCircle, X, Users } from "lucide-react";
import { NavLink } from 'react-router-dom';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
     ${isActive ? "bg-emerald-400 text-white border-l-4 border-emerald-800" : "text-slate-700 bg-slate-100 hover:bg-slate-200"}`;
     
  return (
    <>
      {/* Overlay in mobile view */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed z-50 inset-y-0 left-0 w-68 md:w-64 px-4 pb-4 pt-8 md:pt-4 rounded-xl transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:static lg:translate-x-0`}
      >
        <div className='bg-white flex flex-col rounded-xl h-full '>

          {/* Header section */}
          <div className="px-6 py-5 flex items-center justify-between border-b border-slate-800 bg-linear-to-br from-[#021B1F] to-[#0B3A42] rounded-t-xl text-white">
            <span className="text-xl font-bold">📋 TaskFlow Pro</span>

            {/* sidebar close Icon in mobile view */}
            <button onClick={() => setSidebarOpen(false)} className="md:hidden">
              <X size={20} />
            </button>
          </div>

          {/* sidebar link */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            <NavLink
              to="/"
              end
              className={linkClass}
              onClick={() => setSidebarOpen(false)}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </NavLink>

            <NavLink
              to="/team"
              end
              className={linkClass}
              onClick={() => setSidebarOpen(false)}
            >
              <Users size={18} />
              Team Members
            </NavLink>

            <NavLink
              to="/profile"
              end
              className={linkClass}
              onClick={() => setSidebarOpen(false)}
            >
              <Users size={18} />
              Profile
            </NavLink>
          </nav>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
