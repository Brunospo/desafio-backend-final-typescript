"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderMiddleware = void 0;
const index_1 = __importDefault(require("../database/index"));
const yupOrderSchema_1 = require("../schemas/yupOrderSchema");
const apiErros_1 = require("../utils/apiErros");
class OrderMiddleware {
    async validateBodyRegister(req, res, next) {
        const { cliente_id, pedido_produtos } = req.body;
        const productData = [];
        let totalValue = 0;
        await yupOrderSchema_1.validateOrderFields.validate({ cliente_id, pedido_produtos });
        const existsClient = await (0, index_1.default)('clientes').where({ id: cliente_id }).first();
        if (!existsClient) {
            throw new apiErros_1.NotFoundError('Não existe cliente para o cliente_id informado');
        }
        for (const [index, order] of pedido_produtos.entries()) {
            const product = await index_1.default.select('quantidade_estoque', 'valor', 'descricao').from('produtos').where({ id: order.produto_id }).first();
            if (!product) {
                throw new apiErros_1.NotFoundError(`Problema no pedido_produtos[${index}]: Não existe produto cadastrado para o produto_id informado`);
            }
            if (order.quantidade_produto > product.quantidade_estoque) {
                throw new apiErros_1.BadRequestError(`Problema no pedido_produtos[${index}]: quantidade_produto é maior que a quantidade em estoque(${product.quantidade_estoque} unidades)`);
            }
            totalValue += (order.quantidade_produto * product.valor);
            productData.push({ value: product.valor, description: product.descricao, stock: product.quantidade_estoque });
        }
        req.productData = { productData, totalValue };
        next();
    }
    ;
    async validateQueryParam(req, res, next) {
        const { cliente_id } = req.query;
        if (cliente_id) {
            await yupOrderSchema_1.validateQueryId.validate({ cliente_id });
            const existsClient = await (0, index_1.default)('clientes').where({ id: cliente_id }).first();
            if (!existsClient) {
                throw new apiErros_1.NotFoundError('Não existe cliente para o cliente_id informado');
            }
        }
        next();
    }
    ;
}
exports.OrderMiddleware = OrderMiddleware;
