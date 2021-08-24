import dbClient from "../utils/database";
import { User } from "@prisma/client";
import { compare, hash } from "bcrypt";

export async function findUserWithValidation(userData: User) {
  const foundUser = await dbClient.user.findUnique({
    where: { username: userData.username },
  });
  if (!foundUser) throw new Error("Username/Password incorrect");

  const isPasswordValid = await compare(userData.password, foundUser.password);
  if (!isPasswordValid) throw new Error("Username/Password incorrect");

  return foundUser;
}

export async function createWithHash(newUser: User) {
  const plaintext = newUser.password;

  const hashedPassword = await hash(plaintext, 15);
  const savedUser = await dbClient.user.create({
    data: { ...newUser, password: hashedPassword },
  });

  return savedUser;
}
