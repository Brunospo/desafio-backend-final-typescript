"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBodyAuthentication = void 0;
const index_1 = __importDefault(require("../database/index"));
const yupAuthenticationSchema_1 = require("../schemas/yupAuthenticationSchema");
const apiErros_1 = require("../utils/apiErros");
const bcrypt_1 = require("../utils/bcrypt");
const validateBodyAuthentication = async (req, res, next) => {
    const { email, senha } = req.body;
    await yupAuthenticationSchema_1.validateAuthenticationFields.validate({ email, senha });
    const user = await (0, index_1.default)('usuarios').where({ email }).first();
    if (!user) {
        throw new apiErros_1.BadRequestError('Email e/ou senha inválido(s).');
    }
    const correctPassword = await (0, bcrypt_1.isCorrectPassword)(senha, user.senha);
    if (!correctPassword) {
        throw new apiErros_1.BadRequestError('Email e/ou senha inválido(s).');
    }
    req.usuario = { id: user.id, nome: user.nome, email: user.email };
    next();
};
exports.validateBodyAuthentication = validateBodyAuthentication;
