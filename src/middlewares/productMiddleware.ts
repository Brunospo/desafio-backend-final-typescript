import knex from '../database/index';

import { NextFunction, Request, Response } from "express";
import { validateRegisterFields, validateIdtype } from '../schemas/yupProductSchema';
import { NotFoundError, BadRequestError } from '../utils/apiErros';
import { supabase } from '../config/supabase';

export class ProductMiddleware {
	async validateBodyFields(req: Request, res: Response, next: NextFunction) {
		const { descricao, quantidade_estoque, valor, categoria_id, produto_imagem } = req.body;
	
		await validateRegisterFields.validate({ descricao, quantidade_estoque, valor, categoria_id, produto_imagem });	
	
		const existsCategory = await knex('categorias').where({id: categoria_id}).first();
		if (!existsCategory) {
			throw new NotFoundError('Essa categoria não existe.');
		}
	
		next();
	};
	
	async validateProductId(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;
	
		await validateIdtype.validate({id});
	
		const existsProduct = await knex('produtos').where({id}).first();
			
		if (!existsProduct) {
			throw new NotFoundError('Esse produto não existe');
		}
	
		req.productImgUrl = existsProduct.produto_imagem;
		next();
	};
	
	async validateCategoryQuery(req: Request, res: Response, next: NextFunction) {
		const { categoria_id } = req.query;
	
		if (categoria_id) {
			await validateIdtype.validate({id: categoria_id});
			
			const existsCategory = await knex('categorias').where({id: categoria_id}).first();
			if (!existsCategory) {
				throw new NotFoundError('Essa categoria não existe.');
			}
		}
	
		next();
	};
	
	async validateIfHasProductInOrder(req: Request, res: Response, next: NextFunction) {
	
		const { id } = req.params;
	
		const existsProduct = await knex('pedido_produtos').where({ produto_id: id }).first();
	
		if (existsProduct) {
			throw new BadRequestError('Esse produto não pode ser deletado, pois está associado a um pedido.');
		}
	
		next();
	};
	
	async deleteSupabaseImgIfExists(req: Request, res: Response, next: NextFunction) {
		const hasImg = req.productImgUrl;
		const { produto_imagem } = req.body;
	
		if (hasImg || (hasImg && !produto_imagem)) {
			const imgName = hasImg.slice(81);
			
			const { error } = await supabase
				.storage
				.from(process.env.SUPABASE_BUCKET ?? "") //eslint-disable-line
				.remove([imgName]);
	
			if (error) {
				throw new BadRequestError('Não foi possivel deletar o produto_imagem no servidor de armazenamento de imagens');
			}
		}
	
		next();
	};
}