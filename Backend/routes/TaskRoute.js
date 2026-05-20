import express from "express"
import { Authuser } from "../middleware/AuthMiddleware.js";
import { createTask, getTasks } from "../controllers/TaskController.js";

const taskRouter = express.Router();

taskRouter.post('/create-task',Authuser, createTask)
taskRouter.get('/get-tasks',Authuser, getTasks)

export default taskRouter