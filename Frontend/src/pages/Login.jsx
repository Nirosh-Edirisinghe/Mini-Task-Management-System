import React, { useContext } from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { Eye, EyeOff } from "lucide-react";
import { AppContext } from '../context/AppContext.jsx';
import { toast } from 'react-toastify';

const Login = () => {

  const {backendUrl} = useContext(AppContext)
  const [mode, setMode] = useState("login"); // login | register
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPassword, setShowPassword] = useState(false)
  

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let url = "";

      if (mode === "register") {
        url = `${backendUrl}/api/auth/register`;
      } else {
        url = `${backendUrl}/api/auth/login`;
      }

      const { data } = await axios.post(url, form);      

      // LOGIN
      if (mode === "login") {
        if (data && data.token) {
          // store full user (BEST PRACTICE)
          localStorage.setItem("user", JSON.stringify(data));
          toast.success("Login Success")

          // 🔥 Role-based redirect
          if (data.role === "ADMIN") {
            navigate("/");
          } else {
            navigate("/");
          }
        }
      }
      // REGISTER
      else {
        toast.error("Registered successfully!");
        setMode("login");
      }

    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-cyan-100 to-gray-100 p-6">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 p-3">

        {/* Left Side */}
        <div className="relative bg-linear-to-br from-[#021B1F] to-[#0B3A42] text-white p-10 flex flex-col justify-between rounded-3xl">

          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              📋 TaskFlow Pro
            </h1>
          </div>

          <div>
            <h2 className="text-4xl font-bold leading-tight mb-6">
              Smart  <br />
              <span className="text-cyan-400"> Task Management</span> <br />
              Platform
            </h2>

            <div className="space-y-4 text-sm text-gray-300">
              <div className="flex items-start gap-3">
                <span className="text-cyan-400">✔</span>
                <p>
                  Organize and manage daily tasks efficiently
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-cyan-400">✔</span>
                <p>
                  Track project progress with real-time updates
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-cyan-400">✔</span>
                <p>
                  Collaborate with teams and boost productivity
                </p>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-10">
            © 2026 Nirosh Edirisinghe. All rights reserved.
          </p>
        </div>

        <div className="flex items-center justify-center p-8 md:p-14">
          <div className="w-full max-w-sm">

            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {mode === "login"
                ? isAdmin
                  ? "Admin Login"
                  : "User Login"
                : "User Register"}
            </h2>

            <p className="text-gray-500 mb-8 text-sm">
              {mode === "login"
                ? "Sign in to your account"
                : "Register your new account"}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Register only */}
              {mode === "register" && (
                <div>
                  <label className="text-sm text-gray-600">
                    Full Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full mt-1 px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
              )}

              {/* Email */}
              <div>
                <label className="text-sm text-gray-600">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="name@email.com"
                  className="w-full mt-1 px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-sm text-gray-600">
                  Password
                </label>

                <div className="relative mt-1">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full mt-1 px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        password: e.target.value,
                      })
                    }
                  />

                  {/* Eye Icon */}
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-cyan-600 cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>

              </div>

              {/* Button */}
              <button className="w-full bg-cyan-500 hover:bg-cyan-800 text-white py-3 rounded-lg font-semibold transition duration-300 cursor-pointer">
                {mode === "login"
                  ? isAdmin
                    ? "Admin Login"
                    : "Sign In"
                  : "Create Account"}
              </button>
            </form>

            {/* 🔄 Switch between login/register */}
            <div className="text-center mt-6 text-sm text-gray-600">
              {mode === "login" ? (
                <>
                  <p>
                    Don’t have an account?{" "}
                    <span
                      className="text-cyan-700 font-semibold cursor-pointer hover:underline"
                      onClick={() => {
                        setMode("register");
                        setIsAdmin(false);
                      }}
                    >
                      Register
                    </span>
                  </p>

                  <p className="mt-3">
                    {isAdmin ? (
                      <span
                        className="text-green-600 cursor-pointer font-medium hover:underline"
                        onClick={() => setIsAdmin(false)}
                      >
                        Switch to User Login
                      </span>
                    ) : (
                      <span
                        className="text-purple-600 cursor-pointer font-medium hover:underline"
                        onClick={() => setIsAdmin(true)}
                      >
                        Login as Admin
                      </span>
                    )}
                  </p>
                </>
              ) : (
                <p>
                  Already have an account?{" "}
                  <span
                    className="text-cyan-700 font-semibold cursor-pointer hover:underline"
                    onClick={() => setMode("login")}
                  >
                    Login
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Login
