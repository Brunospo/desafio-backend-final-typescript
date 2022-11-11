import knex from "../database/index";

import { NextFunction, Request, Response } from "express";
import { isCorrectPassword } from "../utils/bcrypt";
import { BadRequestError } from "../utils/apiErros";
import { validateUserFields, validateEditPasswordFields } from "../schemas/yupUserSchema";

export class UserMiddleware {
  async validateBodyRegister (req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
  
    await validateUserFields.validate({ ...req.body });
  
    const existisEmail = await knex.select('email').from('usuarios').where({ email }).first();
  
    if (existisEmail) {
      throw new BadRequestError('Email já cadastrado');
    }
  
    next();
  };
  
  async validateBodyEditPassword (req: Request, res: Response, next: NextFunction) {
    const { email, senha_antiga, senha_nova } = req.body;
  
    await validateEditPasswordFields.validate({ ...req.body });
  
    const user = await knex.select('email', 'senha').from('usuarios').where({ email }).first();
  
    if (!user) {
      throw new BadRequestError('Email e/ou senha inválido(s).');
    }
  
    const correctOldPassword = await isCorrectPassword(senha_antiga, user.senha);
  
    if (!correctOldPassword) {
      throw new BadRequestError('Email e/ou senha inválido(s).');
    }
  
    if (correctOldPassword && (senha_antiga === senha_nova)) {
      throw new BadRequestError('A nova senha deve ser diferente da senha antiga.');
    }
  
    next();
  };
  
  async validateBodyUpdate (req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    const { email: oldEmail } = req.usuario;
  
    await validateUserFields.validate({ ...req.body });
  
    if (email !== oldEmail) {
      const existisEmail = await knex.select('email').from('usuarios').where({ email }).first();
  
      if (existisEmail) {
        throw new BadRequestError('Email já cadastrado');
      }
    }
  
    next();
  };
}