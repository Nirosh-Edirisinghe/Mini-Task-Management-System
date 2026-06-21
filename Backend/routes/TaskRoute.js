import express from "express"
import { Authuser } from "../middleware/AuthMiddleware.js";
import { createTask, deleteTask, getSingleTask, getTasks, updateTask } from "../controllers/TaskController.js";

const taskRouter = express.Router();

taskRouter.post('/create-task', Authuser, createTask)
taskRouter.get('/get-tasks', Authuser, getTasks)
taskRouter.get('/get/:id', Authuser, getSingleTask)
taskRouter.put('/update/:id', Authuser, updateTask)
taskRouter.delete('/delete/:id', Authuser, deleteTask)

export default taskRouter