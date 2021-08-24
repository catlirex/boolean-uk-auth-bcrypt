import { Router } from "express";
import { getAllUser } from "./controller";

const userRouter = Router();

userRouter.get("/", getAllUser);

export default userRouter;
