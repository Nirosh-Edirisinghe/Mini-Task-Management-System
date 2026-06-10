import React from 'react'

const TaskCard = ({ task, user }) => {
  return (
    <div className="bg-white rounded-xl shadow-xl p-4 space-y-3">

      {/* TOP ROW: Title + Status */}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-800 text-sm">
          {task.title}
        </h3>

        <span
          className={`px-2 py-1 text-xs rounded-full ${task.status === "TODO"
              ? "bg-red-200 text-red-600"
              : task.status === "IN_PROGRESS"
                ? "bg-yellow-200 text-yellow-600"
                : "bg-green-200 text-green-600"
            }`}
        >
          {task.status.replace("_", " ").toLowerCase()}
        </span>
      </div>

      {/* DUE DATE */}
      <div className="text-sm text-gray-500">
        📅 {task.dueDate
          ? new Date(task.dueDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
          : "No due date"}
      </div>

      {/* BOTTOM ROW: User + Priority */}
      <div className="flex justify-between items-center">

        {/* LEFT: USER */}
        <div className="flex items-center gap-2">
          <img
            src={task.assignedTo?.image || "https://i.pravatar.cc/40"}
            alt={task.assignedTo?.name}
            className="w-8 h-8 rounded-full object-cover"
          />

          <span className="text-sm text-gray-700">
            {task.assignedTo?.name}
            {task.assignedTo?._id === user?._id && (
              <span className="ml-1 text-gray-600 text-xs">(me)</span>
            )}
          </span>
        </div>

        {/* RIGHT: PRIORITY */}
        <span className="px-2 py-1 text-xs text-gray-700 rounded-full bg-gray-200">
          {task.priority}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;


