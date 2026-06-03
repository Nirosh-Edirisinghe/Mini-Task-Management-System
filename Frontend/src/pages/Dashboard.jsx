import React, { useContext, useState } from 'react'
import AddTask from '../components/AddTask';
import { AppContext } from '../context/AppContext.jsx';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import '../styles/calendar.css'

const Dashboard = () => {
  const { token, tasks, user } = useContext(AppContext)
  console.log(tasks);

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  const displayTasks =
    user?.role === "ADMIN"
      ? tasks?.allTasks || []
      : tasks?.myTracking || [];

  return (
    <div className='flex flex-col h-screen gap-4 p-4'>
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
          className="bg-emerald-400 text-white px-4 py-2 rounded-lg hover:bg-emerald-500"
        >
          + Add Task
        </button>
      </div>

      {/* FIRST ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Left - Calendar */}
        <div className="bg-white py-4 px-2 rounded-xl shadow md:col-span-1 h-80 flex flex-col">
          <h2 className="font-semibold mb-3 text-slate-700 px-2">Calendar</h2>
          <div className="flex-1 overflow-auto">
            <Calendar
              onChange={setDate}
              value={date}
              className="border-none w-full h-full"
            />
          </div>

        </div>

        {/* Right - Tasks */}
        <div className="bg-white p-4 rounded-xl shadow md:col-span-2 h-80 flex flex-col">
          <h2 className="font-semibold mb-3 text-slate-700">
            {user.role === "admin" ? "All Tasks" : "My Tasks"}
          </h2>

          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2">Title</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Due Date</th>
                </tr>
              </thead>

              <tbody>
                {displayTasks.map((task) => (
                  <tr key={task._id} className="border-b">
                    <td className="py-2">{task.title}</td>
                    <td>{task.status}</td>
                    <td>{task.priority}</td>
                    <td>
                      {new Date(task.dueDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0  flex items-center justify-center bg-black/40 z-50">
          <AddTask setOpen={setOpen} />
        </div>
      )}

    </div>
  )
}

export default Dashboard
