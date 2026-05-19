import taskModel from "../models/TaskModal.js";

// add task
const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      dueDate,
      assignedTo,
    } = req.body;

    const createdBy = req.user._id; 

    // validation (basic)
    if (!title || !description || !dueDate || !assignedTo) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    const task = await taskModel.create({
      title,
      description,
      status,
      priority,
      dueDate,
      assignedTo,
      createdBy,
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {createTask}