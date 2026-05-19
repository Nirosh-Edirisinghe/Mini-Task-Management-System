import React, { useContext, useState } from 'react'
import AddTask from '../components/AddTask';
import { AppContext } from '../context/AppContext.jsx';

const Dashboard = () => {
  const {token} = useContext(AppContext)
  const [open, setOpen] = useState(false);
  
  return (
    <div className='flex flex-col h-scree'>
      {/* Header */}
      <div className='flex justify-between items-center bg-white rounded-xl py-2 px-4 shadow'>
        {/* Left Side */}
        <div>
          <h1 className="text-xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-sm text-slate-500">
            Manage your tasks and track your progress easily.
          </p>
        </div>

        {/* Right Side */}
        <button
          onClick={() => setOpen(true)}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
        >
          + Add Task
        </button>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <AddTask setOpen={setOpen}/>         
        </div>
      )}

    </div>
  )
}

export default Dashboard
