import express from "express"
import { Authuser } from "../middleware/AuthMiddleware.js";
import { createTask } from "../controllers/TaskController.js";

const taskRouter = express.Router();

taskRouter.post('/create-task',Authuser, createTask)

export default taskRouter