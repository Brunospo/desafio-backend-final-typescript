import { Router } from "express";
import { UserController } from "../controllers/userController";
import { UserMiddleware } from '../middlewares/userMiddleware';
import { validateToken } from '../middlewares/validateTokenMiddleware';

const router = Router();

router.post('/', new UserMiddleware().validateBodyRegister, new UserController().registerUser);
router.patch('/redefinir', new UserMiddleware().validateBodyEditPassword, new UserController().editPassword);
router.use(validateToken);
router.get('/', new UserController().userDetails);
router.put('/', new UserMiddleware().validateBodyUpdate, new UserController().updateUser);

export default router;