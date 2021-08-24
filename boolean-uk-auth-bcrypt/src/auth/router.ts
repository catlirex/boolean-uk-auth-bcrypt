import { Router } from "express";
import { loginUser, logoutUser, createUser } from "./controller";

const authRouter = Router();

authRouter.route("/login").post(loginUser);

authRouter.route("/signup").post(createUser);

authRouter.route("/logout").get(logoutUser);

export default authRouter;
