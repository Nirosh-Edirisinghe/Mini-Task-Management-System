import express from "express"
import { Authuser } from "../middleware/AuthMiddleware.js";
import { createTask, getSingleTask, getTasks } from "../controllers/TaskController.js";

const taskRouter = express.Router();

taskRouter.post('/create-task', Authuser, createTask)
taskRouter.get('/get-tasks', Authuser, getTasks)
taskRouter.get('/get/:id', Authuser, getSingleTask)

export default taskRouter