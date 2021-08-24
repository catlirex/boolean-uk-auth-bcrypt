import userClient from "./service";
import { Request, Response } from "express";

export async function getAllUser(req: Request, res: Response) {
  const result = await userClient.findMany();
  res.json(result);
}
