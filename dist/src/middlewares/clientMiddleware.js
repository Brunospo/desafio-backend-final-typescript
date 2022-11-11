"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientMiddleware = void 0;
const index_1 = __importDefault(require("../database/index"));
const yupClientSchema_1 = require("../schemas/yupClientSchema");
const apiErros_1 = require("../utils/apiErros");
class ClientMiddleware {
    async validateBodyClient(req, res, next) {
        const { email, cpf } = req.body;
        await yupClientSchema_1.validateClientFields.validate({ ...req.body });
        const existisEmail = await index_1.default.select('email').from('clientes').where({ email }).first();
        const existisCPF = await index_1.default.select('cpf').from('clientes').where({ cpf }).first();
        if (existisEmail) {
            throw new apiErros_1.BadRequestError('Email já cadastrado');
        }
        if (existisCPF) {
            throw new apiErros_1.BadRequestError('CPF já cadastrado');
        }
        next();
    }
    ;
    async validateId(req, res, next) {
        const { id } = req.params;
        await yupClientSchema_1.validateIdtype.validate({ id });
        const existsClient = await (0, index_1.default)('clientes').where({ id }).first();
        if (!existsClient) {
            throw new apiErros_1.NotFoundError('Esse cliente não existe');
        }
        req.cliente = existsClient;
        next();
    }
    ;
    async validateUpdateBody(req, res, next) {
        const { email, cpf } = req.body;
        const { email: oldEmail, cpf: oldCPF } = req.cliente;
        await yupClientSchema_1.validateClientFields.validate({ ...req.body });
        if (email !== oldEmail) {
            const existisEmail = await index_1.default.select('email').from('clientes').where({ email }).first();
            if (existisEmail) {
                throw new apiErros_1.BadRequestError('Email já cadastrado');
            }
        }
        if (cpf !== oldCPF) {
            const existisCPF = await index_1.default.select('cpf').from('clientes').where({ cpf }).first();
            if (existisCPF) {
                throw new apiErros_1.BadRequestError('CPF já cadastrado');
            }
        }
        next();
    }
    ;
}
exports.ClientMiddleware = ClientMiddleware;
