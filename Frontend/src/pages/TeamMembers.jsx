import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { AppContext } from '../context/AppContext.jsx'
import AddUser from '../components/AddUser.jsx'

const TeamMembers = () => {
  const { user } = useContext(AppContext)
  const [userOpen, setUserOpen] = useState(false)
  return (
    <div className='px-1 py-6 sm:p-6 min-h-screen bg-white rounded-xl'>

      {/* header */}
      <div className='flex justify-between items-center'>
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
      <hr />

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
