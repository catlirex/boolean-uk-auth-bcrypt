"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const userRouter = express_1.Router();
userRouter.get("/", controller_1.getAllUser);
exports.default = userRouter;
//# sourceMappingURL=router.js.map