import { NextFunction, Request, Response } from "express";
import knex from "../database/index"
import { validateClientFields, validateIdtype } from "../schemas/yupClientSchema"
import { BadRequestError, NotFoundError } from "../utils/apiErros"

export class ClientMiddleware {
	async validateBodyClient(req: Request, res: Response, next: NextFunction) {

		const { email, cpf } = req.body;
	
		await validateClientFields.validate({ ...req.body });
	
		const existisEmail = await knex.select('email').from('clientes').where({ email }).first();
		const existisCPF = await knex.select('cpf').from('clientes').where({ cpf }).first();
	
		if (existisEmail) {
			throw new BadRequestError('Email já cadastrado');
		}
	
		if (existisCPF) {
			throw new BadRequestError('CPF já cadastrado');
		}
	
		next();
	};
	
	async validateId(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;
	
		await validateIdtype.validate({id});
	
		const existsClient = await knex('clientes').where({id}).first();
					
		if (!existsClient) {
			throw new NotFoundError('Esse cliente não existe');
		}
	
		req.cliente = existsClient;
	
		next();
	};
	
	async validateUpdateBody(req: Request, res: Response, next: NextFunction) {
		const { email, cpf } = req.body;
		const { email: oldEmail, cpf: oldCPF } = req.cliente;
	
		await validateClientFields.validate({ ...req.body });
	
		if (email !== oldEmail) {
			const existisEmail = await knex.select('email').from('clientes').where({ email }).first();
	
			if (existisEmail) {
				throw new BadRequestError('Email já cadastrado');
			}
		}
	
		if (cpf !== oldCPF) {
			const existisCPF = await knex.select('cpf').from('clientes').where({ cpf }).first();
	
			if (existisCPF) {
				throw new BadRequestError('CPF já cadastrado');
			}
		}
	
		next();
	};
}