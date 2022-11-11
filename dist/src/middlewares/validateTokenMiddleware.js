"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = __importDefault(require("../database/index"));
const apiErros_1 = require("../utils/apiErros");
const validateToken = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        throw new apiErros_1.UnauthorizedError('Para acessar este recurso um token de autenticação válido deve ser enviado.');
    }
    const token = authorization.replace('Bearer ', '').trim();
    const { id } = jsonwebtoken_1.default.verify(token, process.env.JWT_SECUREPASSWORD ?? ""); //eslint-disable-line
    const user = await index_1.default.select('id', 'nome', 'email').from('usuarios').where({ id }).first();
    if (!user) {
        throw new apiErros_1.NotFoundError('Usuario não encontrado');
    }
    req.usuario = user;
    next();
};
exports.validateToken = validateToken;
