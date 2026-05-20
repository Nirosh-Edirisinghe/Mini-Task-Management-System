import React from 'react'
import { useState } from 'react';
import { ChevronDown, X } from "lucide-react";
import { Listbox } from "@headlessui/react";
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from "axios"
import { toast } from 'react-toastify';

const roles = ["ADMIN", "USER"];

const AddUser = ({ setUserOpen }) => {

  const { backendUrl, token} = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddUser = async () => {
    console.log(formData);
    try {

      const { data } = await axios.post(
        `${backendUrl}/api/user/add-users`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success("User Added Successfully")
        setUserOpen(false);
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="bg-white w-125 max-h-[90vh] rounded-2xl py-4 pl-4 pr-2 shadow-xl overflow-hidden">

        <div className="overflow-y-auto max-h-[80vh] p-2">

          {/* Header */}
          <div className="mb-3">
            <h2 className="text-2xl font-bold text-slate-800">
              Add New User
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Add new members to team .
            </p>
          </div>

          {/* Title */}
          <div className="mb-3">
            <label className="text-sm font-medium text-slate-700">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter user name"
              className="w-full mt-1 border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          {/* email */}
          <div className="mb-3">
            <label className="text-sm font-medium text-slate-700">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              className="w-full mt-1 border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          {/* password */}
          <div className="mb-3">
            <label className="text-sm font-medium text-slate-700">
              Enter Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full mt-1 border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          {/* Assign User */}
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1 text-slate-700">
              User Role
            </label>

            <Listbox
              value={formData.role}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  role: value,
                })
              }
            >
              {({ open }) => (

                <div className="relative">

                  {/* Button */}
                  <Listbox.Button
                    className="w-full border border-gray-300 focus:outline-none      focus:ring-1 focus:ring-emerald-100 rounded-md px-3 py-2 text-left flex items-center justify-between text-slate-600 bg-white"
                  >
                    <span>
                      {formData.role.toLowerCase() || "Select Role"}
                    </span>

                    <ChevronDown
                      size={18}
                      className={`stroke-gray-500 transition-transform ${open ? "rotate-180" : ""}`}
                    />
                  </Listbox.Button>

                  {/* Options */}
                  <Listbox.Options
                    className="absolute mt-1 w-full border border-gray-300 bg-white shadow-lg rounded-md z-10 overflow-hidden max-h-60 overflow-y-auto"
                  >
                    {roles.map((role) => (
                      <Listbox.Option
                        key={role}
                        value={role}
                        className={({ active }) =>
                          `cursor-pointer px-3 py-1 transition ${active
                            ? "bg-emerald-100 text-emerald-700"
                            : "text-gray-700"}`
                        }
                      >
                        {role.toLowerCase()}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              )}
            </Listbox>
          </div>

          {/* Buttons */}
          <div className="flex justify-between gap-2">

            <button
              onClick={() => setUserOpen(false)}
              className="px-4 py-2 w-[50%] rounded-lg bg-slate-300 hover:bg-slate-400 cursor-pointer"
            >
              Cancel
            </button>

            <button
              onClick={handleAddUser}
              className="px-4 py-2 w-[50%] rounded-lg bg-emerald-400 text-white hover:bg-emerald-500 cursor-pointer"
            >
              Add User
            </button>

          </div>

        </div>



      </div>
    </div>
  )
}

export default AddUser
