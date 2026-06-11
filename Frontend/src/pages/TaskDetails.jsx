import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TaskDetails = () => {
  const { backendUrl, token, user } = useContext(AppContext)
  const { id } = useParams(); // get task id
  const [task, setTask] = useState(null);

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/task/get/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        setTask(data.task);
        console.log(data.task);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!task) return <p>Loading...</p>;

  return (
    <>
      <div className='py-6 px-4 sm:px-6 min-h-screen bg-white rounded-xl'>
        {/* Header */}
        <div className="p-4">
          <h2 className="text-3xl font-bold text-slate-700">View Task</h2>
        </div>
        <hr className="text-gray-300" />

        <div className="py-6 px-4 sm:px-6 bg-white rounded-xl">

          {/* Header */}
          <h1 className="text-xl sm:text-3xl font-bold text-slate-800 mb-6">
            {task.title}
          </h1>

          <div className="flex flex-col mb-4 min-w-0 w-full">
            <p className="font-medium text-gray-500">Description</p>

            <p className="text-gray-800 break-words break-all whitespace-pre-wrap">
              {task.description}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-[140px_1fr] gap-y-4 gap-x-3 text-md">

            <p className="font-medium text-gray-500">Status</p>
            <p className="text-gray-800">
              <span className={`px-2 py-1 text-xs rounded-full ${task.status === "TODO"
                ? "bg-red-200 text-red-600"
                : task.priority === "IN_PROGRESS"
                  ? "bg-yellow-200 text-yellow-600"
                  : "bg-green-200 text-green-600"
                }`}>
                {task.status}
              </span>
            </p>

            <p className="font-medium text-gray-500">Priority</p>
            <p className="text-gray-800">
              <span className="px-2 py-1 text-xs rounded-full bg-gray-200 ">
                {task.priority}
              </span>
            </p>

            <p className="font-medium text-gray-500">Category</p>
            <p className="text-gray-800">{task.category?.name}</p>

            <p className="font-medium text-gray-500">Due Date</p>
            <p className="text-gray-800">
              {task.dueDate
                ? new Date(task.dueDate).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
                : "No due date"}
            </p>

            {/* Assigned To */}
            <p className="font-medium text-gray-500">Assigned To</p>
            <div className="flex items-center gap-2">
              <img
                src={task.assignedTo?.image}
                alt=""
                className="w-7 h-7 rounded-full"
              />
              <span className="text-gray-800">
                {task.assignedTo?.name}
                {task.assignedTo?._id === user?._id && " (Me)"}
              </span>
            </div>

            {/* Created By */}
            <p className="font-medium text-gray-500">Created By</p>
            <div className="flex items-center gap-2">
              <img
                src={task.createdBy?.image}
                alt=""
                className="w-7 h-7 rounded-full"
              />
              <span className="text-gray-800">
                {task.createdBy?.name}
                {task.createdBy?._id === user?._id && " (Me)"}
              </span>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default TaskDetails;