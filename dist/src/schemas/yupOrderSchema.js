"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateQueryId = exports.validateOrderFields = void 0;
const yup_1 = __importDefault(require("../config/yup"));
exports.validateOrderFields = yup_1.default.object().shape({
    cliente_id: yup_1.default.number().integer('cliente_id deve receber um número inteiro').positive().required(),
    observacao: yup_1.default.string(),
    pedido_produtos: yup_1.default.array().of(yup_1.default.object().shape({
        produto_id: yup_1.default.number().positive().integer().required(),
        quantidade_produto: yup_1.default.number().positive().integer().required()
    })).min(1, 'pedido_produtos deve ter pelo menos 1 item').required()
});
exports.validateQueryId = yup_1.default.object().shape({
    cliente_id: yup_1.default.number().integer('cliente_id deve receber um número inteiro').positive()
});
