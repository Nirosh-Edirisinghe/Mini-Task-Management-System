import express from "express"
import { authorizeRoles, Authuser } from "../middleware/AuthMiddleware.js";
import { getAllUsers } from "../controllers/UserController.js";

const usersRouter = express.Router();

usersRouter.get("/all-users", Authuser, authorizeRoles("ADMIN", "USER"), getAllUsers);

export default usersRouter;