import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { AppContext } from '../context/AppContext.jsx'
import AddUser from '../components/AddUser.jsx'
import UserCard from '../components/UserCard.jsx'

const TeamMembers = () => {
  const { user, users } = useContext(AppContext)
  const [userOpen, setUserOpen] = useState(false)
  console.log(users);

  return (
    <div className='px-1 py-1 sm:p-2 min-h-screen rounded-xl'>

      {/* header */}
      <div className='flex justify-between bg-white rounded-xl py-3 px-4 shadow items-center'>
        <div className='flex flex-col'>
          <h2 className="text-3xl text-slate-700 font-bold">Team Members</h2>
          <p className="text-gray-600 text-md font-md">Monitor team performance and task progress</p>
        </div>

        <div>
          {user?.role === "ADMIN" && (
            <button
              onClick={() => setUserOpen(true)}
              className="bg-emerald-400 text-white px-4 py-2 rounded-lg hover:bg-emerald-500">+ Users</button>
          )}
        </div>

      </div>

      {/* CARD VIEW*/}
      <div className="mt-6 space-y-3 md:hidden">
        {(users || []).map((u) => (
          <UserCard key={u._id} u={u} currentUser={user} />
        ))}
      </div>

      {/* table section */}
      <div className="hidden md:block mt-6 overflow-x-auto shadow-md">
        <table className="w-full border border-gray-200 rounded-xl overflow-hidden">

          {/* Table Head */}
          <thead className="bg-gray-100 text-left text-sm text-gray-600">
            <tr>
              <th className="p-3">Member</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {(users || []).map((u) => (
              <tr
                key={u._id}
                className="border-b border-gray-300 bg-white transition"
              >

                {/* Image + Name */}
                <td className="p-3 flex items-center gap-3">

                  <img
                    src={u.image || "https://i.pravatar.cc/40"}
                    alt={u.name}
                    className="w-9 h-9 rounded-full object-cover"
                  />

                  <span className="text-slate-700 font-medium">
                    {u.name}

                    {/* 👇 (me) tag */}
                    {user?._id === u._id && (
                      <span className="ml-2 text-gray-600 font-semibold">
                        (me)
                      </span>
                    )}
                  </span>

                </td>

                {/* Email */}
                <td className="p-3 text-gray-600">
                  {u.email}
                </td>

                {/* Role */}
                <td className="p-3">
                  <span className="px-3 py-1 text-xs rounded bg-emerald-100 text-emerald-700">
                    {u.role}
                  </span>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Add user modal */}
      {userOpen && (
        <div className="fixed inset-0  flex items-center justify-center bg-black/40 z-50">
          <AddUser setUserOpen={setUserOpen} />
        </div>
      )}
    </div>
  )
}

export default TeamMembers
