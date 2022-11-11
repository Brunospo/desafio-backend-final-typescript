"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientController = void 0;
const index_1 = __importDefault(require("../database/index"));
class ClientController {
    async registerClient(req, res) {
        const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;
        const [client] = await (0, index_1.default)('clientes')
            .insert({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado })
            .returning('*');
        const clientRemovedNullKeys = Object.fromEntries(Object.entries(client).filter(value => value[1] !== null));
        return res.status(201).json({ cliente: clientRemovedNullKeys });
    }
    ;
    async updateClient(req, res) {
        const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;
        const { id } = req.params;
        const [client] = await (0, index_1.default)('clientes')
            .update({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado })
            .where({ id }).returning('*');
        const clientRemovedNullKeys = Object.fromEntries(Object.entries(client).filter(value => value[1] !== null));
        return res.json({ cliente: clientRemovedNullKeys });
    }
    ;
    async listClient(req, res) {
        const clients = await (0, index_1.default)('clientes');
        return res.json({ clientes: clients });
    }
    ;
    async detailClient(req, res) {
        return res.json({ cliente: req.cliente });
    }
    ;
}
exports.ClientController = ClientController;
