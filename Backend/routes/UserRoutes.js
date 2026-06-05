import express from "express"
import { authorizeRoles, Authuser } from "../middleware/AuthMiddleware.js";
import { createUser, getAllUsers, getUserProfile, updateUserProfile } from "../controllers/UserController.js";
import upload from "../middleware/multer.js";

const usersRouter = express.Router();

usersRouter.get("/all-users", Authuser, authorizeRoles("ADMIN", "USER"), getAllUsers);
usersRouter.post("/add-users", Authuser, authorizeRoles("ADMIN"), createUser);
usersRouter.get('/profile', Authuser, getUserProfile)
usersRouter.put("/update-profile", Authuser, upload.single("image"), updateUserProfile);

export default usersRouter;