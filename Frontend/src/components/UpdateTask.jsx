import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext.jsx';
import axios from "axios"
import { ChevronDown, X } from "lucide-react";
import { Listbox } from "@headlessui/react";
import { toast } from 'react-toastify';

const priorities = ["LOW", "MEDIUM", "HIGH"];
const statusList = ["TODO", "IN_PROGRESS", "DONE"];

const UpdateTask = ({ task, setOpen, fetchTask }) => {
  const { backendUrl, token, users, categories } = useContext(AppContext);
  const [formData, setFormData] = useState({
    title: task?.title || "",
    description: task?.description || "",
    priority: task?.priority || "MEDIUM",
    status: task?.status || "TODO",
    dueDate: task?.dueDate
      ? task.dueDate.split("T")[0]
      : "",
    assignedTo: task?.assignedTo?._id || "",
    category: task?.category?._id || "",
  });

  // filter user
  const selectedCategory = categories.find(
    (cat) => cat._id === formData.category
  );

  const filteredUsers = selectedCategory?.users || [];

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // update task
  const handleUpdateTask = async () => {
    try {

      const { data } = await axios.put(
        `${backendUrl}/api/task/update/${task._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success("Task Updated Successfully");
        fetchTask(); 
        setOpen(false);
      } else {
        toast.error(data.message);        
      }

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <div>
      <div className="bg-white w-125 max-h-[90vh] rounded-2xl py-4 pl-4 pr-2 shadow-xl overflow-hidden">

        <div className="overflow-y-auto max-h-[80vh] p-2">

          {/* Header */}
          <div className="mb-3">
            <h2 className="text-2xl font-bold text-slate-800">
              Update Task
            </h2>

            <p className="text-sm text-slate-500 mt-1">
               Update task information.
            </p>
          </div>

          {/* Title */}
          <div className="mb-3">
            <label className="text-sm font-medium text-slate-700">
              Task Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
              className="w-full mt-1 border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="text-sm font-medium text-slate-700">
              Description
            </label>

            <textarea
              rows="2"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter task description"
              className="w-full mt-1 border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          {/* Priority + Status */}
          <div className="grid grid-cols-2 gap-4 mb-3">

            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700">
                Priority
              </label>

              <Listbox
                value={formData.priority}
                onChange={(value) =>
                  setFormData({
                    ...formData,
                    priority: value,
                  })
                }
              >
                {({ open }) => (
                  <div className="relative">

                    {/* Button */}
                    <Listbox.Button className="w-full border border-gray-300 focus:outline-none     focus:ring-1 focus:ring-emerald-100 rounded-md px-3 py-2 text-left flex items-center justify-between text-slate-600 bg-white"
                    >
                      <span className="capitalize">
                        {formData.priority.toLowerCase()}
                      </span>

                      <ChevronDown
                        size={18}
                        className={`stroke-gray-500 transition-transform ${open ? "rotate-180" : ""}`}
                      />
                    </Listbox.Button>

                    {/* Options */}
                    <Listbox.Options
                      className="absolute mt-1 w-full border border-gray-300 bg-white shadow-lg rounded-md z-10 overflow-hidden"
                    >
                      {priorities.map((priority) => (
                        <Listbox.Option
                          key={priority}
                          value={priority}
                          className={({ active }) =>
                            `cursor-pointer px-3 py-1 capitalize transition ${active
                              ? "bg-emerald-100 text-emerald-700"
                              : "text-gray-700"}`
                          }
                        >
                          {priority.toLowerCase()}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>

                  </div>
                )}
              </Listbox>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700">
                Status
              </label>

              <Listbox
                value={formData.status}
                onChange={(value) =>
                  setFormData({
                    ...formData,
                    status: value,
                  })
                }
              >
                {({ open }) => (
                  <div className="relative">

                    {/* Button */}
                    <Listbox.Button
                      className="w-full border border-gray-300 focus:outline-none      focus:ring-1 focus:ring-emerald-100 rounded-md px-3 py-2 text-left flex items-center justify-between text-slate-600 bg-white"
                    >
                      <span className="capitalize">
                        {formData.status.replace("_", " ").toLowerCase()}
                      </span>

                      <ChevronDown
                        size={18}
                        className={`stroke-gray-500 transition-transform ${open ? "rotate-180" : ""}`}
                      />
                    </Listbox.Button>

                    {/* Options */}
                    <Listbox.Options
                      className="absolute mt-1 w-full border border-gray-300 bg-white shadow-lg rounded-md z-10 overflow-hidden"
                    >
                      {statusList.map((status) => (
                        <Listbox.Option
                          key={status}
                          value={status}
                          className={({ active }) =>
                            `cursor-pointer px-3 py-1 capitalize transition ${active
                              ? "bg-emerald-100 text-emerald-700"
                              : "text-gray-700"}`
                          }
                        >
                          {status.replace("_", " ").toLowerCase()}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>

                  </div>
                )}
              </Listbox>
            </div>

          </div>

          {/* Due Date */}
          <div className="mb-3">
            <label className="text-sm font-medium text-slate-700">
              Due Date
            </label>

            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full mt-1 border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* category */}
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1 text-slate-700">
              Select Category
            </label>

            <Listbox
              value={formData.category}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  category: value,
                  assignedTo: "", // reset user when category changes
                })
              }
            >
              {({ open }) => {
                const selectedCategory = categories.find(
                  (cat) => cat._id === formData.category
                );

                return (
                  <div className="relative">

                    {/* Button */}
                    <Listbox.Button
                      className="w-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-emerald-100 rounded-md px-3 py-2 text-left flex items-center justify-between text-slate-600 bg-white"
                    >
                      <span>
                        {selectedCategory
                          ? selectedCategory.name
                          : "Select Category"}
                      </span>

                      <ChevronDown
                        size={18}
                        className={`stroke-gray-500 transition-transform ${open ? "rotate-180" : ""
                          }`}
                      />
                    </Listbox.Button>

                    {/* Options */}
                    <Listbox.Options
                      className="absolute mt-1 w-full border border-gray-300 bg-white shadow-lg rounded-md z-10 overflow-hidden max-h-60 overflow-y-auto"
                    >
                      {categories.length > 0 ? (
                        categories.map((cat) => (
                          <Listbox.Option
                            key={cat._id}
                            value={cat._id}
                            className={({ active }) =>
                              `cursor-pointer px-3 py-2 transition ${active
                                ? "bg-emerald-100 text-emerald-700"
                                : "text-gray-700"
                              }`
                            }
                          >
                            {cat.name}
                          </Listbox.Option>
                        ))
                      ) : (
                        <div className="px-3 py-2 text-gray-400 text-sm">
                          No categories found
                        </div>
                      )}
                    </Listbox.Options>

                  </div>
                );
              }}
            </Listbox>
          </div>

          {/* Assign User */}
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1 text-slate-700">
              Assign To
            </label>

            <Listbox
              value={formData.assignedTo}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  assignedTo: value,
                })
              }
            >
              {({ open }) => {

                const selectedUser = users.find(
                  (user) => user._id === formData.assignedTo
                );

                return (
                  <div className="relative">

                    {/* Button */}
                    <Listbox.Button
                      className="w-full border border-gray-300 focus:outline-none      focus:ring-1 focus:ring-emerald-100 rounded-md px-3 py-2 text-left flex items-center justify-between text-slate-600 bg-white"
                    >
                      <span>
                        {selectedUser
                          ? selectedUser.name
                          : "Select User"}
                      </span>

                      <ChevronDown
                        size={18}
                        className={`stroke-gray-500 transition-transform ${open ? "rotate-180" : ""}`}
                      />
                    </Listbox.Button>

                    {/* Options */}
                    <Listbox.Options
                      className="absolute mt-1 w-full border border-gray-300 bg-white shadow-lg rounded-md z-10 overflow-hidden max-h-60 overflow-y-auto"
                    >
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                          <Listbox.Option
                            key={user._id}
                            value={user._id}
                            className={({ active }) =>
                              `cursor-pointer px-3 py-1 transition ${active
                                ? "bg-emerald-100 text-emerald-700"
                                : "text-gray-700"}`
                            }
                          >
                            {user.name}
                          </Listbox.Option>
                        ))) : (
                        <div className="px-3 py-2 text-gray-400 text-sm">
                          No users in this category
                        </div>
                      )
                      }
                    </Listbox.Options>

                  </div>
                );
              }}
            </Listbox>
          </div>

          {/* Buttons */}
          <div className="flex justify-between gap-2">

            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2 w-[50%] rounded-lg bg-slate-300 hover:bg-slate-400 cursor-pointer"
            >
              Cancel
            </button>

            <button
              onClick={handleUpdateTask}
              className="px-4 py-2 w-[50%] rounded-lg bg-emerald-400 text-white hover:bg-emerald-500 cursor-pointer"
            >
              Update Task
            </button>

          </div>

        </div>



      </div>
    </div>
  )
}

export default UpdateTask
