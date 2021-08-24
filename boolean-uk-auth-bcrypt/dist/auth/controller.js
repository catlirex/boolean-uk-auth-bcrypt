"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.logoutUser = exports.loginUser = void 0;
const service_1 = require("./service");
const authGenerator_1 = require("../utils/authGenerator");
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userCreds = req.body;
        try {
            const loggedUser = yield service_1.findUserWithValidation(userCreds);
            const token = authGenerator_1.createToken({
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
        }
        catch (e) {
            res.status(401).json({ error: e.message });
        }
    });
}
exports.loginUser = loginUser;
function logoutUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.clearCookie("token");
        res.json({ user: null });
    });
}
exports.logoutUser = logoutUser;
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newUser = req.body;
        try {
            const savedUser = yield service_1.createWithHash(newUser);
            const token = authGenerator_1.createToken({
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
        }
        catch (e) {
            if (e.message.includes("Unique constraint failed"))
                res.status(400).json({ error: "username/email exists" });
            console.log(e.message);
        }
    });
}
exports.createUser = createUser;
//# sourceMappingURL=controller.js.map