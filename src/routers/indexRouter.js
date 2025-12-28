import { Router } from 'express';
import authRouter from './authRouter.js';
import productRouter from './productsRouter.js';
import userRouter from './userRouter.js';

const router = Router();

router.use('/user', userRouter);
router.use('/products', productRouter);
router.use('/auth', authRouter);

export default router;
