import React, { useState } from 'react'
import { LayoutDashboard, AlertCircle, X, Users, LogOut } from "lucide-react";
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
     ${isActive ? "bg-emerald-400 text-white border-l-4 border-emerald-800" : "text-slate-700 bg-slate-100 hover:bg-slate-200"}`;


  const handleLogout = () => {
    localStorage.removeItem("user"); 
    setShowLogout(false);
    navigate("/login");
  };

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
        <div className='bg-white flex flex-col rounded-xl h-full relative overflow-hidden '>

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
              to="/task"
              end
              className={linkClass}
              onClick={() => setSidebarOpen(false)}
            >
              <Users size={18} />
              Tasks
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

          {/* Logout section */}
          <div className="px-4 pb-6 mt-auto">
            <button
              onClick={() => setShowLogout(true)}
              className="w-full flex items-center justify-between text-gray-600 bg-gray-200 px-3 py-2 rounded-lg transition cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <LogOut size={18} />
                Logout
              </span>
            </button>
          </div>

          {/* logout conformation section */}
          <div
            className={`absolute bottom-0 left-0 w-full bg-white shadow-lg transition-transform duration-300 ${showLogout ? "translate-y-0" : "translate-y-full"
              }`}
          >
            <div className="p-4 flex flex-col items-center text-center bg-gray-300">

              <h2 className="text-md font-semibold">Confirm Logout</h2>

              <p className="text-sm text-gray-700 mt-1">
                Are you sure you want to logout?
              </p>

              {/* Buttons */}
              <div className="flex w-full gap-2 mt-4">

                <button
                  onClick={() => setShowLogout(false)}
                  className="w-1/2 py-1 bg-gray-200 rounded cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  onClick={handleLogout}
                  className="w-1/2 py-1 bg-red-600 text-white rounded cursor-pointer"
                >
                  Logout
                </button>

              </div>
            </div>
          </div>
        </div>

      </aside>
    </>
  )
}

export default Sidebar
