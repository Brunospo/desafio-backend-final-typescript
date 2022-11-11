import { Router } from 'express';
import { validateToken } from '../middlewares/validateTokenMiddleware';
import { OrderController } from '../controllers/orderController';
import { OrderMiddleware } from '../middlewares/orderMiddleware';

const router = Router();

router.use(validateToken);
router.post('/', new OrderMiddleware().validateBodyRegister, new OrderController().registerOrder);
router.get('/', new OrderMiddleware().validateQueryParam, new OrderController().listOrders);

export default router;