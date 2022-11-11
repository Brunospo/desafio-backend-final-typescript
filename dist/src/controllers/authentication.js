"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginUser = async (req, res) => {
    const user = req.usuario;
    const token = jsonwebtoken_1.default.sign(user, process.env.JWT_SECUREPASSWORD ?? "", { expiresIn: '2h' }); //eslint-disable-line
    return res.json({ usuario: { ...user }, token });
};
exports.loginUser = loginUser;
