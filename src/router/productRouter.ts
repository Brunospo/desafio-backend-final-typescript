import { Router } from 'express';
import { ProductController } from '../controllers/productController';
import { ProductMiddleware } from '../middlewares/productMiddleware';
import { validateToken } from '../middlewares/validateTokenMiddleware';

const router = Router();

router.use(validateToken);
router.post('/', new ProductMiddleware().validateBodyFields, new ProductController().registerProduct);
router.put('/:id', new ProductMiddleware().validateProductId, new ProductMiddleware().validateBodyFields, new ProductMiddleware().deleteSupabaseImgIfExists, new ProductController().editProduct);
router.get('/', new ProductMiddleware().validateCategoryQuery, new ProductController().listProduct);
router.get('/:id', new ProductMiddleware().validateProductId, new ProductController().detailProduct);
router.delete('/:id', new ProductMiddleware().validateProductId, new ProductMiddleware().validateIfHasProductInOrder, new ProductMiddleware().deleteSupabaseImgIfExists, new ProductController().deleteProduct);

export default router;