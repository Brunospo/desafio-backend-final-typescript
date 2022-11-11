"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const index_1 = __importDefault(require("../database/index"));
class ProductController {
    async registerProduct(req, res) {
        const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
        let { produto_imagem } = req.body;
        if (!produto_imagem) {
            produto_imagem = null;
        }
        const [product] = await (0, index_1.default)('produtos').insert({ descricao, quantidade_estoque, valor, categoria_id, produto_imagem }).returning('*');
        return res.json({ produto: product });
    }
    ;
    async editProduct(req, res) {
        const { id } = req.params;
        const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
        let { produto_imagem } = req.body;
        if (!produto_imagem) {
            produto_imagem = null;
        }
        const [updatedProduct] = await (0, index_1.default)('produtos').update({ descricao, quantidade_estoque, valor, categoria_id, produto_imagem }).where({ id }).returning('*');
        return res.json({ produto: updatedProduct });
    }
    ;
    async listProduct(req, res) {
        const { categoria_id } = req.query;
        const querryListProduct = (0, index_1.default)('produtos');
        if (categoria_id) {
            querryListProduct.where({ categoria_id });
        }
        const product = await querryListProduct;
        return res.json({ produtos: product });
    }
    ;
    async detailProduct(req, res) {
        const { id } = req.params;
        const product = await (0, index_1.default)('produtos').where({ id }).first();
        return res.json({ produto: product });
    }
    ;
    async deleteProduct(req, res) {
        const { id } = req.params;
        await (0, index_1.default)('produtos').del().where({ id });
        return res.json({ message: 'Produto deletado com sucesso' });
    }
    ;
}
exports.ProductController = ProductController;
