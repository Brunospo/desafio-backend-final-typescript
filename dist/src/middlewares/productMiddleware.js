"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductMiddleware = void 0;
const index_1 = __importDefault(require("../database/index"));
const yupProductSchema_1 = require("../schemas/yupProductSchema");
const apiErros_1 = require("../utils/apiErros");
const supabase_1 = require("../config/supabase");
class ProductMiddleware {
    async validateBodyFields(req, res, next) {
        const { descricao, quantidade_estoque, valor, categoria_id, produto_imagem } = req.body;
        await yupProductSchema_1.validateRegisterFields.validate({ descricao, quantidade_estoque, valor, categoria_id, produto_imagem });
        const existsCategory = await (0, index_1.default)('categorias').where({ id: categoria_id }).first();
        if (!existsCategory) {
            throw new apiErros_1.NotFoundError('Essa categoria não existe.');
        }
        next();
    }
    ;
    async validateProductId(req, res, next) {
        const { id } = req.params;
        await yupProductSchema_1.validateIdtype.validate({ id });
        const existsProduct = await (0, index_1.default)('produtos').where({ id }).first();
        if (!existsProduct) {
            throw new apiErros_1.NotFoundError('Esse produto não existe');
        }
        req.productImgUrl = existsProduct.produto_imagem;
        next();
    }
    ;
    async validateCategoryQuery(req, res, next) {
        const { categoria_id } = req.query;
        if (categoria_id) {
            await yupProductSchema_1.validateIdtype.validate({ id: categoria_id });
            const existsCategory = await (0, index_1.default)('categorias').where({ id: categoria_id }).first();
            if (!existsCategory) {
                throw new apiErros_1.NotFoundError('Essa categoria não existe.');
            }
        }
        next();
    }
    ;
    async validateIfHasProductInOrder(req, res, next) {
        const { id } = req.params;
        const existsProduct = await (0, index_1.default)('pedido_produtos').where({ produto_id: id }).first();
        if (existsProduct) {
            throw new apiErros_1.BadRequestError('Esse produto não pode ser deletado, pois está associado a um pedido.');
        }
        next();
    }
    ;
    async deleteSupabaseImgIfExists(req, res, next) {
        const hasImg = req.productImgUrl;
        const { produto_imagem } = req.body;
        if (hasImg || (hasImg && !produto_imagem)) {
            const imgName = hasImg.slice(81);
            const { error } = await supabase_1.supabase
                .storage
                .from(process.env.SUPABASE_BUCKET ?? "") //eslint-disable-line
                .remove([imgName]);
            if (error) {
                throw new apiErros_1.BadRequestError('Não foi possivel deletar o produto_imagem no servidor de armazenamento de imagens');
            }
        }
        next();
    }
    ;
}
exports.ProductMiddleware = ProductMiddleware;
