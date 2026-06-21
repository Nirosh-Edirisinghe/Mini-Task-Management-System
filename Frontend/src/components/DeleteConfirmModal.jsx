import React from "react";

const DeleteConfirmModal = ({
  title = "Delete Task",
  message = "Are you sure you want to delete this task?",
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-100 rounded-xl p-6 shadow-xl mx-6">

        <h2 className="text-xl font-bold text-slate-800 mb-2">
          {title}
        </h2>

        <p className="text-gray-600 mb-6">
          {message}
        </p>

        <div className="flex justify-end gap-3">

          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 cursor-pointer"
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  );
};

export default DeleteConfirmModal;