import { Request, Response } from "express";
import knex from "../database/index"

export class ClientController {
	async registerClient(req: Request, res: Response) {

		const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;
	
		const [client] = await knex('clientes')
			.insert({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado })
			.returning('*');
	
		const clientRemovedNullKeys = Object.fromEntries(Object.entries(client).filter(value => value[1] !== null));
	
		return res.status(201).json({ cliente: clientRemovedNullKeys });
	};
	
	async updateClient(req: Request, res: Response) {
	
		const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;
		const { id } = req.params;
	
		const [client] = await knex('clientes')
			.update({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado })
			.where({ id }).returning('*');
	
		const clientRemovedNullKeys = Object.fromEntries(Object.entries(client).filter(value => value[1] !== null));
	
		return res.json({ cliente: clientRemovedNullKeys });
	};
	
	async listClient(req: Request, res: Response) {
		
		const clients = await knex('clientes');
	
		return res.json({ clientes: clients });
	};
	
	async detailClient(req: Request, res: Response) {
		return res.json({cliente: req.cliente});
	};
}