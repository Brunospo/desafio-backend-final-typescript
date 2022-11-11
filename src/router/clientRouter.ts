import { Router } from "express";
import { ClientMiddleware } from "../middlewares/clientMiddleware";
import { ClientController } from "../controllers/clientController";
import { validateToken } from '../middlewares/validateTokenMiddleware';

const router = Router();

router.use(validateToken);
router.post('/', new ClientMiddleware().validateBodyClient, new ClientController().registerClient);
router.put('/:id', new ClientMiddleware().validateId, new ClientMiddleware().validateUpdateBody, new ClientController().updateClient);
router.get('/', new ClientController().listClient);
router.get('/:id', new ClientMiddleware().validateId, new ClientController().detailClient);

export default router;