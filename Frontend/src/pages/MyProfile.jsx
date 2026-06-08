import React, { useContext, useRef, useState } from "react";
import { Plus, Check } from "lucide-react";
import profile_placeholder from '../assets/profile_placeholder.png'
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { useEffect } from "react";
import { toast } from 'react-toastify';

const MyProfile = () => {

  const { userData, backendUrl, token, fetchUserData } = useContext(AppContext)
  const fileInputRef = useRef(null);

  const [profileImage, setProfileImage] = useState(profile_placeholder);
  const [selectedFile, setSelectedFile] = useState(null);
  const [newEmail, setNewEmail] = useState("");
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  // image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedFile(file);

    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();

      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      const { data } = await axios.put(`${backendUrl}/api/user/update-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (data.success) {
        await fetchUserData();
        toast.success(data.message);
      } else {
        console.log(data.message);
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error)
    }
  };

  // email update
  const handleEmailUpdate = async () => {
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/user/update-email`,
        { email: newEmail },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        await fetchUserData();
        setIsEditingEmail(false);
        console.log("Email updated");
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // sync backend image
  useEffect(() => {
    if (userData?.image) {
      setProfileImage(userData.image);
    }
  }, [userData]);

  useEffect(() => {
    if (userData?.email) {
      setNewEmail(userData.email);
    }
  }, [userData]);

  return (
    <>
      <div className='py-6 sm:p-6 min-h-screen bg-white rounded-xl'>
        {/* Header */}
        <div className="p-6">
          <h2 className="text-3xl font-bold text-slate-700">Profile</h2>
        </div>
        <hr className="text-gray-300" />

        {/* Profile Image */}
        <div className="grid md:grid-cols-[200px_1fr] gap-6 p-6 border-b border-gray-300">
          <div>
            <h3 className="font-semibold text-slate-700">Profile photo</h3>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <img
              src={profileImage}
              alt=""
              className="w-28 h-28 rounded-2xl object-cover "
            />

            <div>
              <button
                onClick={() => fileInputRef.current.click()}
                className="flex items-center text-gray-700 font-medium gap-2 border border-gray-600 rounded-full px-5 py-2 hover:bg-slate-50 cursor-pointer"
              >
                <Plus size={16} />
                Upload photo
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />

              <p className="text-xs text-gray-500 mt-3">
                Supported formats: jpg, png, jpeg
              </p>

              <p className="text-xs text-gray-500">
                Max file size: 500KB
              </p>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="grid md:grid-cols-[200px_1fr] gap-6 p-6 border-b border-gray-300">
          <div>
            <h3 className="font-semibold text-slate-700">User Details</h3>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Username
              </label>

              <input
                type="text"
                value={userData?.name || ""}
                readOnly
                className="w-full max-w-md bg-gray-200 rounded-xl px-4 py-2 outline-none text-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Role
              </label>

              <input
                type="text"
                value={userData?.role || "User"}
                readOnly
                className="w-full max-w-md bg-gray-200 rounded-xl px-4 py-2 outline-none text-gray-800"
              />
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="grid md:grid-cols-[200px_1fr] gap-6 p-6 border-b border-gray-300">
          <div>
            <h3 className="font-semibold text-slate-700">Email address</h3>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {isEditingEmail ? (
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="border px-3 py-2 rounded w-full sm:w-auto"
              />
            ) : (
              <p className="text-blue-400 underline">
                {userData?.email}
              </p>
            )}

            {/* BUTTONS */}
            <div className="flex gap-3">
              {isEditingEmail ? (
                <>
                  <button
                    onClick={() => setIsEditingEmail(false)}
                    className="px-4 py-2 border rounded-full"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleEmailUpdate}
                    className="px-4 py-2 bg-emerald-500 text-white rounded-full"
                  >
                    Save
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditingEmail(true)}
                  className="border border-gray-700 text-gray-800 rounded-full px-6 py-2 hover:bg-slate-50"
                >
                  Change email address
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Actions */}
        <div className="grid md:grid-cols-[200px_1fr] gap-6 py-4">

          <div className="hidden md:block"></div>

          <div className="px-6 py-4 flex flex-wrap gap-4 justify-start">
            <button className="w-full sm:w-auto sm:px-10 py-2 bg-slate-300 hover:bg-slate-400 cursor-pointer rounded-full">
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="w-full sm:w-auto px-4 py-2 bg-emerald-400 text-white hover:bg-emerald-500 rounded-full flex items-center justify-center gap-2 font-medium"
            >
              <Check size={16} />
              Save Changes
            </button>
          </div>
        </div>

      </div>

    </>
  )
}

export default MyProfile
