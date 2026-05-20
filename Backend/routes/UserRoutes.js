import express from "express"
import { authorizeRoles, Authuser } from "../middleware/AuthMiddleware.js";
import { createUser, getAllUsers } from "../controllers/UserController.js";

const usersRouter = express.Router();

usersRouter.get("/all-users", Authuser, authorizeRoles("ADMIN", "USER"), getAllUsers);
usersRouter.post("/add-users", Authuser, authorizeRoles("ADMIN"), createUser);

export default usersRouter;