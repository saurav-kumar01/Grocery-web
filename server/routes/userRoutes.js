import express from "express";
import {
  isAuth,
  login,
  logout,
  register,
} from "../controllers/userController.js"; // Import the register function from userController
import authUser from "../middlewares/authUser.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login); // Assuming login is handled by the same function for simplicity
userRouter.get("/is-auth", authUser, isAuth);
userRouter.get("/logout", authUser, logout);

export default userRouter;
