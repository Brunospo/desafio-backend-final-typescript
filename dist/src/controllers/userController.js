"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const bcrypt_1 = require("../utils/bcrypt");
const index_1 = __importDefault(require("../database/index"));
class UserController {
    async registerUser(req, res) {
        const { nome, email, senha } = req.body;
        const encryptedPassword = await (0, bcrypt_1.encryptPassword)(senha);
        const [user] = await (0, index_1.default)('usuarios').insert({ nome, email, senha: encryptedPassword }).returning(['id', 'nome', 'email']);
        return res.status(201).json({ usuario: user });
    }
    ;
    async editPassword(req, res) {
        const { email, senha_nova } = req.body;
        const encryptedPassword = await (0, bcrypt_1.encryptPassword)(senha_nova);
        await (0, index_1.default)('usuarios').where({ email }).update({ senha: encryptedPassword });
        res.json({ message: 'Senha alterada com sucesso' });
    }
    ;
    async userDetails(req, res) {
        return res.json({ usuario: { ...req.usuario } });
    }
    ;
    async updateUser(req, res) {
        const { nome, email, senha } = req.body;
        const encryptedPassword = await (0, bcrypt_1.encryptPassword)(senha);
        const [user] = await (0, index_1.default)('usuarios').update({ nome, email, senha: encryptedPassword }).where({ id: req.usuario.id }).returning(['id', 'nome', 'email']);
        return res.status(201).json({ usuario: user });
    }
    ;
}
exports.UserController = UserController;
