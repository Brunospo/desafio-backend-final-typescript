import jwt, { JwtPayload } from 'jsonwebtoken';
import knex from '../database/index';

import { UnauthorizedError, NotFoundError } from '../utils/apiErros';
import { Request, Response, NextFunction } from 'express';

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {

	const { authorization } = req.headers;

	if (!authorization) {
		throw new UnauthorizedError('Para acessar este recurso um token de autenticação válido deve ser enviado.');
	}

	const token = authorization.replace('Bearer ', '').trim();

	const { id } = jwt.verify(token, process.env.JWT_SECUREPASSWORD ?? "") as JwtPayload; //eslint-disable-line

	const user = await knex.select('id', 'nome', 'email').from('usuarios').where({ id }).first();

	if (!user) {
		throw new NotFoundError('Usuario não encontrado');
	}

	req.usuario = user;

	next();
};