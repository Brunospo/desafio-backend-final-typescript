"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateIdtype = exports.validateClientFields = void 0;
const yup_1 = __importDefault(require("../config/yup"));
exports.validateClientFields = yup_1.default.object().shape({
    nome: yup_1.default.string().required(),
    email: yup_1.default.string().email('Formato de email inválido').required(),
    cpf: yup_1.default.string().required().length(11).matches(/\d{11}/g, 'O CPF deve ser composto apenas de números'),
    cep: yup_1.default.string().length(8).matches(/\d{8}/g, 'O CEP deve ser composto apenas de números'),
    rua: yup_1.default.string(),
    numero: yup_1.default.number().integer('O numero deve ser um inteiro').positive(),
    bairro: yup_1.default.string(),
    cidade: yup_1.default.string(),
    estado: yup_1.default.string().length(2).matches(/[A-Za-z]{2}/g, 'O estado deve ser composto apenas de letras')
});
exports.validateIdtype = yup_1.default.object().shape({
    id: yup_1.default.number().positive().integer()
});
