import { Router } from "express";
import * as UserControllers from "../controllers/user.js";
import checkAuthenticatedUser from "../middlewares/checkAuthenticatedUser.js";

const userRoute = Router();

userRoute.get(
  "/",
  checkAuthenticatedUser,
  UserControllers.getAuthenticatedUser
);

userRoute.post("/login", UserControllers.Login);

userRoute.post("/signup", UserControllers.Signup);

userRoute.post("/update/admin/:id", UserControllers.updateProfileAdmin);

userRoute.post(
  "/update",
  checkAuthenticatedUser,
  UserControllers.updateProfile
);

userRoute.post("/logout", UserControllers.Logout);

userRoute.get("/get", UserControllers.getAllUsers);

export default userRoute;
