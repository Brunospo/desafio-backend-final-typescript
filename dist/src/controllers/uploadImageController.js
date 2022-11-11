"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
/* eslint-disable no-undef */
const supabase_1 = require("../config/supabase");
const apiErros_1 = require("../utils/apiErros");
const uploadImage = async (req, res) => {
    const { imagem } = req.body;
    const buffer = Buffer.from(imagem, 'base64');
    const { data, error } = await supabase_1.supabase
        .storage
        .from(process.env.SUPABASE_BUCKET ?? "")
        .upload(`${Date.now()}.jpg`, buffer, {
        contentType: 'image/jpg'
    });
    if (error) {
        throw new apiErros_1.BadRequestError("Não foi possivel atualizar imagem");
    }
    const imgURL = `${process.env.SUPABASE_STORAGE_URL}${data.Key}`;
    return res.status(201).json({ imgURL });
};
exports.uploadImage = uploadImage;
