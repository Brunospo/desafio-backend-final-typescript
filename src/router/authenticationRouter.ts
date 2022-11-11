import { Router } from 'express';
import { loginUser } from '../controllers/authentication';
import { validateBodyAuthentication } from '../middlewares/authenticationMiddleware';

const router = Router();

router.post('/', validateBodyAuthentication, loginUser);

export default router;