"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMiddleware = void 0;
const index_1 = __importDefault(require("../database/index"));
const bcrypt_1 = require("../utils/bcrypt");
const apiErros_1 = require("../utils/apiErros");
const yupUserSchema_1 = require("../schemas/yupUserSchema");
class UserMiddleware {
    async validateBodyRegister(req, res, next) {
        const { email } = req.body;
        await yupUserSchema_1.validateUserFields.validate({ ...req.body });
        const existisEmail = await index_1.default.select('email').from('usuarios').where({ email }).first();
        if (existisEmail) {
            throw new apiErros_1.BadRequestError('Email já cadastrado');
        }
        next();
    }
    ;
    async validateBodyEditPassword(req, res, next) {
        const { email, senha_antiga, senha_nova } = req.body;
        await yupUserSchema_1.validateEditPasswordFields.validate({ ...req.body });
        const user = await index_1.default.select('email', 'senha').from('usuarios').where({ email }).first();
        if (!user) {
            throw new apiErros_1.BadRequestError('Email e/ou senha inválido(s).');
        }
        const correctOldPassword = await (0, bcrypt_1.isCorrectPassword)(senha_antiga, user.senha);
        if (!correctOldPassword) {
            throw new apiErros_1.BadRequestError('Email e/ou senha inválido(s).');
        }
        if (correctOldPassword && (senha_antiga === senha_nova)) {
            throw new apiErros_1.BadRequestError('A nova senha deve ser diferente da senha antiga.');
        }
        next();
    }
    ;
    async validateBodyUpdate(req, res, next) {
        const { email } = req.body;
        const { email: oldEmail } = req.usuario;
        await yupUserSchema_1.validateUserFields.validate({ ...req.body });
        if (email !== oldEmail) {
            const existisEmail = await index_1.default.select('email').from('usuarios').where({ email }).first();
            if (existisEmail) {
                throw new apiErros_1.BadRequestError('Email já cadastrado');
            }
        }
        next();
    }
    ;
}
exports.UserMiddleware = UserMiddleware;
