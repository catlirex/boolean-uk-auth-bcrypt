"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./resources/user/router"));
const router_2 = __importDefault(require("./auth/router"));
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
var app = express_1.default();
app.use(logger("dev"));
app.use(express_1.default.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:4000", credentials: true }));
app.use(router_2.default);
app.use("/users", router_1.default);
app.all("*", (req, res) => {
    res.status(404).json("No route match");
});
module.exports = app;
//# sourceMappingURL=app.js.map