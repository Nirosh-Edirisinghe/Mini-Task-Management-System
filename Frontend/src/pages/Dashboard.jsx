import React, { useContext, useState } from 'react'
import AddTask from '../components/AddTask';
import { AppContext } from '../context/AppContext.jsx';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import '../styles/calendar.css'
import { formatStatus } from '../utils/formatData.js';
import AddCategoryModal from '../components/AddCategoryModal.jsx';

const Dashboard = () => {
  const { token, tasks, user, categories } = useContext(AppContext)
  console.log(tasks);

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [catOpen, setCatOpen] = useState(false)

  const displayTasks =
    user?.role === "ADMIN"
      ? tasks?.allTasks || []
      : tasks?.myTask || [];

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
          <h2 className="font-semibold mb-3 text-slate-800">
            {user.role === "ADMIN" ? "All Tasks" : "My Tasks"}
          </h2>

          <div className="flex-1 overflow-y-auto ">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-gray-300 text-slate-700 ">
                  <th className="py-2">Title</th>
                  <th>Status</th>
                  <th>Due Date</th>
                </tr>
              </thead>

              <tbody>
                {displayTasks.map((task) => (
                  <tr key={task._id} className="border-b border-gray-300 text-slate-800">
                    <td className="py-2">{task.title}</td>
                    <td>{formatStatus(task.status)}</td>
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

      {/* Second ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* category section */}
        <div className="bg-white py-4 px-2 rounded-xl shadow md:col-span-1 h-60 flex flex-col">
          <h2 className="font-semibold mb-3 text-slate-900 px-2">Categories</h2>
          <hr className='text-gray-300 mb-2' />

          {/*Scrollable List */}
          <div className="flex-1 overflow-y-auto px-2 space-y-2">

            {categories.length === 0 ? (
              <p className="text-sm text-gray-400 text-center mt-10">
                No categories found
              </p>
            ) : (
              categories.map((cat) => (
                <div
                  key={cat._id}
                  className="flex justify-between border-b border-gray-200 px-2 py-1"
                >
                  <p className="text-sm text-slate-700">
                    {cat.name}
                  </p>

                  <div className="flex flex-wrap gap-1 mt-1">
                    {cat.users.map((u) => (
                      <span
                        key={u._id}
                        className="text-xs bg-gray-100 px-2 py-1 rounded"
                      >
                        {u.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            )}

          </div>

          {/*Fixed Bottom Button */}
          <div className="flex flex-start pt-3 px-2">
            <button
              onClick={() => setCatOpen(true)}
              className="text-gray-800 font-medium"
            >
              + Add More
            </button>
          </div>

        </div>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0  flex items-center justify-center bg-black/40 z-50">
          <AddTask setOpen={setOpen} />
        </div>
      )}

      {/* category modal */}
      {catOpen && (
        <AddCategoryModal setCatOpen={setCatOpen} />
      )}

    </div>
  )
}

export default Dashboard
