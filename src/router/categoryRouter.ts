import { Router } from "express"
import { Category } from "../controllers/categoryController"

const router = Router();

export default router.get('/', new Category().listCategories);