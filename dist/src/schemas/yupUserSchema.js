"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEditPasswordFields = exports.validateUserFields = void 0;
const yup_1 = __importDefault(require("../config/yup"));
exports.validateUserFields = yup_1.default.object().shape({
    nome: yup_1.default.string().required(),
    email: yup_1.default.string().email('Formato de email inválido').required(),
    senha: yup_1.default.string().required()
});
exports.validateEditPasswordFields = yup_1.default.object().shape({
    email: yup_1.default.string().email('Formato de email inválido').required(),
    senha_antiga: yup_1.default.string().required(),
    senha_nova: yup_1.default.string().required()
});
