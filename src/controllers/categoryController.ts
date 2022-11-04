import { Request, Response } from "express";
import knex from "../database/index"

export class Category {
  async listCategories (req: Request, res: Response) {
    const result = await knex('categorias');

	  return res.json({categorias: result});
  }
}