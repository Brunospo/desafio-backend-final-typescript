"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateImageBody = void 0;
const yup_1 = __importDefault(require("../config/yup"));
exports.validateImageBody = yup_1.default.object().shape({
    imagem: yup_1.default.string().required('imagem é um campo obrigatório')
});
