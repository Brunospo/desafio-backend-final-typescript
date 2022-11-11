/* eslint-disable indent */
import isBase64 from 'is-base64';

import { NextFunction, Request, Response } from "express";
import { validateImageBody } from '../schemas/yupImageSchema';
import { BadRequestError } from '../utils/apiErros';

export const validateImage = async (req: Request, res: Response, next: NextFunction) => {

    const { imagem } = req.body;

    await validateImageBody.validate({ imagem });

    if (!isBase64(imagem)) {
        throw new BadRequestError('imagem deve está no formato base64');
    }

    next();
};