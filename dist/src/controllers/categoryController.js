"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const index_1 = __importDefault(require("../database/index"));
class Category {
    async listCategories(req, res) {
        const result = await (0, index_1.default)('categorias');
        return res.json({ categorias: result });
    }
}
exports.Category = Category;
