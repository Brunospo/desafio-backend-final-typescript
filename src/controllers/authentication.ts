import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const loginUser = async (req: Request, res: Response) => {
	const user = req.usuario;

	const token = jwt.sign(user, process.env.JWT_SECUREPASSWORD ?? "", { expiresIn: '2h' }); //eslint-disable-line

	return res.json({ usuario: { ...user }, token });
};