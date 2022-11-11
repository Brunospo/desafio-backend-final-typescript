import { Request, Response } from 'express';
import knex from '../database/index'

export class ProductController {
	async registerProduct (req: Request, res: Response) {
		const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
		let { produto_imagem } = req.body;
	
		if (!produto_imagem) {
			produto_imagem = null;
		}
	
		const [ product ] = await knex('produtos').insert({ descricao, quantidade_estoque, valor, categoria_id, produto_imagem }).returning('*');
			
		return res.json({produto: product});
	};
	
	async editProduct(req: Request, res: Response) {
		const { id } = req.params;
		const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
		let { produto_imagem } = req.body;
	
		if (!produto_imagem) {
			produto_imagem = null;
		}
	
		const [ updatedProduct ] = await knex('produtos').update({ descricao, quantidade_estoque, valor, categoria_id, produto_imagem }).where({id}).returning('*');
			
		return res.json({produto: updatedProduct});		
	};
	
	async listProduct (req: Request, res: Response) {
		const { categoria_id } = req.query;
	
		const querryListProduct = knex('produtos');
	
		if (categoria_id) {			
			querryListProduct.where({categoria_id});
		}
	
		const product = await querryListProduct;
			
		return res.json({produtos: product});
	};
	
	async detailProduct(req: Request, res: Response) {
		const { id } = req.params;	
	
		const product = await knex('produtos').where({id}).first();
	
		return res.json({produto: product});
	};
	
	async deleteProduct (req: Request, res: Response) {
		const { id } = req.params;	
	
		await knex('produtos').del().where({id});
	
		return res.json({message: 'Produto deletado com sucesso'});
	};
}