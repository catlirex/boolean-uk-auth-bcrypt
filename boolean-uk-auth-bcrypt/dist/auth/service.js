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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWithHash = exports.findUserWithValidation = void 0;
const database_1 = __importDefault(require("../utils/database"));
const bcrypt_1 = require("bcrypt");
function findUserWithValidation(userData) {
    return __awaiter(this, void 0, void 0, function* () {
        const foundUser = yield database_1.default.user.findUnique({
            where: { username: userData.username },
        });
        if (!foundUser)
            throw new Error("Username/Password incorrect");
        const isPasswordValid = yield bcrypt_1.compare(userData.password, foundUser.password);
        if (!isPasswordValid)
            throw new Error("Username/Password incorrect");
        return foundUser;
    });
}
exports.findUserWithValidation = findUserWithValidation;
function createWithHash(newUser) {
    return __awaiter(this, void 0, void 0, function* () {
        const plaintext = newUser.password;
        const hashedPassword = yield bcrypt_1.hash(plaintext, 15);
        const savedUser = yield database_1.default.user.create({
            data: Object.assign(Object.assign({}, newUser), { password: hashedPassword }),
        });
        return savedUser;
    });
}
exports.createWithHash = createWithHash;
//# sourceMappingURL=service.js.map