import { Request, Response } from "express";

/* eslint-disable no-undef */
import {supabase} from '../config/supabase';
import { BadRequestError } from '../utils/apiErros';

export const uploadImage = async (req: Request, res: Response) => {

	const { imagem } = req.body;

	const buffer = Buffer.from(imagem, 'base64');

	const { data, error } = await supabase
		.storage
		.from(process.env.SUPABASE_BUCKET ?? "")
		.upload(`${Date.now()}.jpg`, buffer, {
			contentType: 'image/jpg'
		});

	if (error) {
		throw new BadRequestError("Não foi possivel atualizar imagem");
	}

	const imgURL = `${process.env.SUPABASE_STORAGE_URL}${data!.Key}`;

	return res.status(201).json({ imgURL });

};