import React from 'react'

const UserCard = ({ u, currentUser }) => {
  return (
    <div>
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center justify-between">

        {/* Left: Image + Name + Email */}
        <div className="flex items-center gap-3">
          <img
            src={u.image || "https://i.pravatar.cc/40"}
            alt={u.name}
            className="w-10 h-10 rounded-full object-cover"
          />

          <div>
            <p className="text-slate-700 font-medium">
              {u.name}
              {currentUser?._id === u._id && (
                <span className="ml-2 text-xs text-gray-500">(me)</span>
              )}
            </p>

            <p className="text-sm text-gray-500">{u.email}</p>
          </div>
        </div>

        {/* Right: Role */}
        <span className="px-3 py-1 text-xs rounded bg-emerald-100 text-emerald-700">
          {u.role}
        </span>

      </div>

    </div>
  )
}

export default UserCard
