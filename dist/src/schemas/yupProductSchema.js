"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateIdtype = exports.validateRegisterFields = void 0;
const yup_1 = __importDefault(require("../config/yup"));
exports.validateRegisterFields = yup_1.default.object().shape({
    descricao: yup_1.default.string().required(),
    quantidade_estoque: yup_1.default.number().min(0).integer('quantidade_estoque deve receber um número inteiro').required(),
    valor: yup_1.default.number().min(0).integer('O valor deve ser informado em cantavos').required(),
    categoria_id: yup_1.default.number().positive().integer('categoria_id deve receber um número inteiro').required(),
    produto_imagem: yup_1.default.string().url().nullable()
});
exports.validateIdtype = yup_1.default.object().shape({
    id: yup_1.default.number().positive().integer()
});
