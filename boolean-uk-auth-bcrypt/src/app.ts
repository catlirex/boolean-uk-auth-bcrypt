import express from "express";
import userRouter from "./resources/user/router";
import authRouter from "./auth/router";

const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:4000", credentials: true }));

app.use(authRouter);
app.use("/users", userRouter);

app.all("*", (req, res) => {
  res.status(404).json("No route match");
});

module.exports = app;
