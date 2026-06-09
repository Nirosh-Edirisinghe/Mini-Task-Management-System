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
      category
    } = req.body;

    const createdBy = req.user._id; 

    // validation (basic)
    if (!title || !description || !dueDate || !assignedTo || !category) {
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
      category,
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

// get tasks
const getTasks = async (req, res) => {
  try {

    const userId = req.user._id;
    const role = req.user.role;

    let myTasks = [];
    let myTracking = [];
    let allTasks = [];

    // Common populate config
    const populateFields = [
      {
        path: "assignedTo",
        select: "name email role image",
      },
      {
        path: "createdBy",
        select: "name email role image",
      },
    ];

    if (role === "ADMIN") {

      // Admin sees all tasks
      allTasks = await taskModel
        .find()
        .populate(populateFields)
        .sort({ createdAt: -1 });

      // Tasks created by admin
      myTracking = await taskModel
        .find({ createdBy: userId })
        .populate(populateFields)
        .sort({ createdAt: -1 });

    } else {

      // Tasks assigned to user
      myTasks = await taskModel
        .find({ assignedTo: userId })
        .populate(populateFields)
        .sort({ createdAt: -1 });

      // Tasks created by user
      myTracking = await taskModel
        .find({ createdBy: userId })
        .populate(populateFields)
        .sort({ createdAt: -1 });
    }

    res.json({
      success: true,
      role,
      tasks: {
        myTasks,
        myTracking,
        allTasks,
      },
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {createTask, getTasks}