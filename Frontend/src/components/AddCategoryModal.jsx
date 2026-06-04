import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext.jsx'
import axios from 'axios'
import { Brackets } from 'lucide-react'
import { toast } from 'react-toastify'
import { Listbox } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

const AddCategoryModal = ({ setCatOpen }) => {

  const { users, token, getCategory, backendUrl } = useContext(AppContext)
  const [name, setName] = useState('')
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleUserSelect = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id)
        ? prev.filter((u) => u !== id)
        : [...prev, id]
    );
  };

  // create category
  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/category/create`,
        { name, users: selectedUsers },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (data.success) {
        toast.success(data.message)
        getCategory();
        setCatOpen(false);
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error)
    }
  }
  console.log(users);


  return (
    <div>
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white p-4 rounded-xl w-100">

          <h2 className="font-semibold text-slate-800 mb-2">Add Category</h2>

          {/* Category Name */}
          <div className="mb-3">
            <label className="text-sm font-medium text-slate-700">
              Category Name
            </label>

            <input
              type="text"
              placeholder="Category name"
              className="w-full mt-1 border border-slate-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>


          {/* Assign Users */}
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1 text-slate-700">
              Assign Users
            </label>

            <Listbox value={selectedUsers} onChange={setSelectedUsers} multiple>
              {({ open }) => (
                <div className="relative">

                  {/* Button */}
                  <Listbox.Button className="w-full border border-gray-300 rounded-md px-3 py-2 text-left flex justify-between items-center bg-white">
                    <span className=" text-slate-600">
                      {selectedUsers.length > 0
                        ? users
                          .filter((u) => selectedUsers.includes(u._id))
                          .map((u) => u.name)
                          .join(", ")
                        : "Select Users"}
                    </span>

                    <ChevronDown
                      size={18}
                      className={`transition-transform ${open ? "rotate-180" : ""}`}
                    />
                  </Listbox.Button>

                  {/* Dropdown */}
                  <Listbox.Options className="mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">

                    {users.map((u) => (
                      <Listbox.Option
                        key={u._id}
                        value={u._id}
                        className={({ active }) =>
                          `cursor-pointer px-3 py-2 flex justify-between items-center ${active
                            ? "bg-emerald-100 text-emerald-700"
                            : "text-gray-700"
                          }`
                        }
                      >
                        {({ selected }) => (
                          <>
                            <span className='text-sm'>{u.name}</span>

                            {selected && (
                              <span className="text-md text-emerald-900">
                                ✓
                              </span>
                            )}
                          </>
                        )}
                      </Listbox.Option>
                    ))}

                  </Listbox.Options>
                </div>
              )}
            </Listbox>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setCatOpen(false)}
              className="px-4 py-1 rounded-lg bg-slate-300 hover:bg-slate-400 cursor-pointer"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              className="px-4 py-1 rounded-lg bg-emerald-400 text-white hover:bg-emerald-500 cursor-pointer"
            >
              Create
            </button>
          </div>

        </div>
      </div>

    </div>
  )
}

export default AddCategoryModal
