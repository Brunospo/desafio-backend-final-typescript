import { Router } from 'express';
import { validateToken } from '../middlewares/validateTokenMiddleware';
import { validateImage } from '../middlewares/uploadImageMiddleware';
import { uploadImage } from '../controllers/uploadImageController';

const router = Router();

router.use(validateToken);
router.post('/', validateImage, uploadImage);

export default router;