"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateImage = void 0;
/* eslint-disable indent */
const is_base64_1 = __importDefault(require("is-base64"));
const yupImageSchema_1 = require("../schemas/yupImageSchema");
const apiErros_1 = require("../utils/apiErros");
const validateImage = async (req, res, next) => {
    const { imagem } = req.body;
    await yupImageSchema_1.validateImageBody.validate({ imagem });
    if (!(0, is_base64_1.default)(imagem)) {
        throw new apiErros_1.BadRequestError('imagem deve está no formato base64');
    }
    next();
};
exports.validateImage = validateImage;
