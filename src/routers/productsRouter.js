import { Router } from 'express';
import { getProductsByQuery } from '../controllers/productController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/searchProduct', ctrlWrapper(getProductsByQuery));

export default router;
