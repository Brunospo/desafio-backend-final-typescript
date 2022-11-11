import { encryptPassword } from "../utils/bcrypt"
import { Request, Response } from "express";

import knex from "../database/index";

export class UserController {

  async registerUser (req: Request, res: Response) {
    const { nome, email, senha } = req.body;
  
    const encryptedPassword = await encryptPassword(senha);
  
    const [user] = await knex('usuarios').insert({ nome, email, senha: encryptedPassword }).returning(['id', 'nome', 'email']);
  
    return res.status(201).json({ usuario: user });
  };
  
  async editPassword (req: Request, res: Response) {
    const { email, senha_nova } = req.body;
  
    const encryptedPassword = await encryptPassword(senha_nova);
  
    await knex('usuarios').where({ email }).update({ senha: encryptedPassword });
  
    res.json({ message: 'Senha alterada com sucesso' });
  };
  
  async userDetails (req: Request, res: Response) {
    return res.json({ usuario: { ...req.usuario } });
  };
  
  async updateUser (req: Request, res: Response) {
    const { nome, email, senha } = req.body;
  
    const encryptedPassword = await encryptPassword(senha);
  
    const [user] = await knex('usuarios').update({ nome, email, senha: encryptedPassword }).where({ id: req.usuario.id }).returning(['id', 'nome', 'email']);
  
    return res.status(201).json({ usuario: user });
  };
}