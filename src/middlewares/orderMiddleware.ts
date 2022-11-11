import { NextFunction, Request, Response } from 'express';
import knex from '../database/index';

import { validateOrderFields, validateQueryId } from '../schemas/yupOrderSchema';
import { NotFoundError, BadRequestError } from '../utils/apiErros';

export class OrderMiddleware {
	async validateBodyRegister(req: Request, res: Response, next: NextFunction) {
		const { cliente_id, pedido_produtos } = req.body;
		const productData = [];
		let totalValue = 0;
	
		await validateOrderFields.validate({cliente_id, pedido_produtos});
	
		const existsClient = await knex('clientes').where({id: cliente_id}).first();
		
		if (!existsClient) {
			throw new NotFoundError('Não existe cliente para o cliente_id informado');
		}
		
		for (const [index, order] of pedido_produtos.entries()) {
			const product = await knex.select('quantidade_estoque', 'valor', 'descricao').from('produtos').where({id: order.produto_id}).first();
			
			if (!product) {
				throw new NotFoundError(`Problema no pedido_produtos[${index}]: Não existe produto cadastrado para o produto_id informado`);
			}
	
			if (order.quantidade_produto > product.quantidade_estoque) {
				throw new BadRequestError(`Problema no pedido_produtos[${index}]: quantidade_produto é maior que a quantidade em estoque(${product.quantidade_estoque} unidades)`);
			}
			
			totalValue += (order.quantidade_produto * product.valor);
			productData.push({value: product.valor, description: product.descricao, stock: product.quantidade_estoque});
		}
	
		req.productData = {productData, totalValue};
	
		next();
	};
	
	async validateQueryParam(req: Request, res: Response, next: NextFunction) {
		const { cliente_id } = req.query;
	
		if (cliente_id) {
			await validateQueryId.validate({cliente_id});
	
			const existsClient = await knex('clientes').where({id: cliente_id}).first();
			
			if (!existsClient) {
				throw new NotFoundError('Não existe cliente para o cliente_id informado');
			}
		}
	
		next();
	};
}