import knex from '../database/index'

import { NextFunction, Request, Response } from 'express';
import { validateAuthenticationFields } from '../schemas/yupAuthenticationSchema';
import { BadRequestError } from '../utils/apiErros';
import { isCorrectPassword } from '../utils/bcrypt';

export const validateBodyAuthentication = async (req: Request, res: Response, next: NextFunction) => {
	const { email, senha } = req.body;

	await validateAuthenticationFields.validate({ email, senha });

	const user = await knex('usuarios').where({ email }).first();

	if (!user) {
		throw new BadRequestError('Email e/ou senha inválido(s).');
	}

	const correctPassword = await isCorrectPassword(senha, user.senha);

	if (!correctPassword) {
		throw new BadRequestError('Email e/ou senha inválido(s).');
	}

	req.usuario = { id: user.id, nome: user.nome, email: user.email };

	next();
};