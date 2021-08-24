import { Request, Response } from "express";
import { findUserWithValidation, createWithHash } from "./service";
import { createToken } from "../utils/authGenerator";

export async function loginUser(req: Request, res: Response) {
  const userCreds = req.body;
  try {
    const loggedUser = await findUserWithValidation(userCreds);

    const token = createToken({
      id: loggedUser.id,
      username: loggedUser.username,
    });

    res.cookie("token", token, { httpOnly: true });

    res.json({
      user: {
        username: loggedUser.username,
        email: loggedUser.email,
      },
    });
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
}

export async function logoutUser(req: Request, res: Response) {
  res.clearCookie("token");
  res.json({ user: null });
}

export async function createUser(req: Request, res: Response) {
  const newUser = req.body;
  try {
    const savedUser = await createWithHash(newUser);

    const token = createToken({
      id: savedUser.id,
      username: savedUser.username,
    });

    res.cookie("token", token, { httpOnly: true });

    res.json({
      user: {
        username: savedUser.username,
        email: savedUser.email,
      },
    });
  } catch (e) {
    if (e.message.includes("Unique constraint failed"))
      res.status(400).json({ error: "username/email exists" });
    console.log(e.message);
  }
}
