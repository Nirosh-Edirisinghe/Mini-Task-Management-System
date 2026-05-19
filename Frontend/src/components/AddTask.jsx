import React, { useState } from 'react'

const AddTask = ({setOpen}) => {

  const [task, setTask] = useState("");

  const handleAddTask = () => {
    console.log("New Task:", task);
    setTask("");
    setOpen(false);
  };

  return (
    <div>
      <div className="bg-white w-96 rounded-xl p-6 shadow-lg">

        <h2 className="text-lg font-bold mb-4">Add New Task</h2>

        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task..."
          className="w-full border rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={() => setOpen(false)}
            className="px-3 py-2 rounded-lg bg-slate-200 hover:bg-slate-300"
          >
            Cancel
          </button>

          <button
            onClick={handleAddTask}
            className="px-3 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
          >
            Save
          </button>
        </div>

      </div>
    </div>
  )
}

export default AddTask
