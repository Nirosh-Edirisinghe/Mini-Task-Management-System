import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { ChevronDown } from 'lucide-react';


const priorityOptions = [
  { label: "All", value: "ALL" },
  { label: "High", value: "HIGH" },
  { label: "Medium", value: "MEDIUM" },
  { label: "Low", value: "LOW" },
];

const Tasks = () => {
  const { tasks, user } = useContext(AppContext)

  const dropdownRef = useRef();
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("ALL");
  const [priorityOpen, setPriorityOpen] = useState(false);
  console.log(tasks);

  // display task based on role
  const displayTasks =
    user?.role === "ADMIN"
      ? tasks?.allTasks || []
      : [
        ...(tasks?.myTasks || []),
        ...(tasks?.myTracking || []),
      ];

  // filter and serach functionality
  const filteredTasks = displayTasks
    .filter((task) => {
      if (priority === "ALL") return true;
      return task.priority === priority;
    })
    .filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setPriorityOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className='py-6 sm:p-2 min-h-screen bg-white rounded-xl'>

        {/* Header */}
        <div className='flex flex-col  py-2 px-4'>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">All Tasks</h1>
          </div>

          <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 gap-4'>

            {/* LEFT: FILTER */}
            <div ref={dropdownRef} className="relative w-32 sm:w-44">
              <button
                onClick={() => setPriorityOpen(!priorityOpen)}
                className="w-full flex items-center justify-between gap-2 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-md px-3 py-2 text-sm font-medium"
              >
                <span>
                  {priorityOptions.find(p => p.value === priority)?.label}
                </span>

                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Dropdown */}
              {priorityOpen && (
                <div className="absolute z-20 mt-1 w-full bg-white border border-emerald-200 rounded-md shadow-md">

                  {priorityOptions.map((item) => (
                    <button
                      key={item.value}
                      onClick={() => {
                        setPriority(item.value);
                        setPriorityOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-emerald-50 ${priority === item.value
                        ? "bg-emerald-50 text-emerald-600 font-semibold"
                        : ""
                        }`}
                    >
                      {item.label}
                    </button>
                  ))}

                </div>
              )}
            </div>

            {/* RIGHT: SEARCH */}
            <input
              type="text"
              placeholder="Search task..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm w-60 focus:outline-none focus:ring-1 focus:ring-emerald-200"
            />

          </div>
        </div>

        {/* task section */}
        <div className="mt-6 mx-2 md:mx-4 overflow-x-auto rounded-xl shadow-xl">
          <table className="w-full border border-gray-300 rounded-lg overflow-hidden">

            {/* HEAD */}
            <thead className="bg-gray-100 text-left text-sm text-gray-600">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Status</th>
                <th className="p-3">Priority</th>
                <th className="p-3">Assigned To</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {filteredTasks.map((task) => (
                <tr
                  key={task._id}
                  className="border-b border-gray-200 text-slate-700 text-sm"
                >

                  {/* TITLE */}
                  <td className="p-3">{task.title}</td>

                  {/* STATUS */}
                  <td className="p-3">{task.status.replace("_", " ").toLowerCase()}</td>

                  {/* PRIORITY */}
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${task.priority === "HIGH"
                        ? "bg-red-200 text-red-600"
                        : task.priority === "MEDIUM"
                          ? "bg-yellow-200 text-yellow-600"
                          : "bg-green-200 text-green-600"
                        }`}
                    >
                      {task.priority}
                    </span>
                  </td>

                  {/* ASSIGNED TO */}
                  <td className="p-3">
                    <div className="flex items-center gap-2">

                      <img
                        src={
                          task.assignedTo?.image ||
                          "https://i.pravatar.cc/40"
                        }
                        alt={task.assignedTo?.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />

                      <span>
                        {task.assignedTo?.name}

                        {task.assignedTo?._id === user?._id && (
                          <span className="ml-1 text-gray-500 text-sm">
                            (me)
                          </span>
                        )}
                      </span>

                    </div>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>

    </>
  )
}

export default Tasks
