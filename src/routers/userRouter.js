import { Router } from 'express';
import { addMyProductsController } from '../controllers/myProducts/addMyProductsController.js';
import { countMyCaloriesController } from '../controllers/myProducts/countMyCaloriesController.js';
import { deleteMyProductController } from '../controllers/myProducts/deleteMyProductController.js';
import { getMyProducts } from '../controllers/myProducts/getMyProducts.js';
import {
  getUserDailyRateController,
  getDailyRateController,
} from '../controllers/usersController.js';
import authenticate from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { addMyProductsSchema } from '../validation/usersValidation.js';

const router = Router();

router.post('/daily-calory-needs', ctrlWrapper(getDailyRateController));

router.post(
  '/my-daily-calories',
  authenticate,
  ctrlWrapper(getUserDailyRateController),
);

router.get(
  '/my-daily-calories-needs',
  authenticate,
  ctrlWrapper(getUserDailyRateController),
);

router.get('/products', authenticate, ctrlWrapper(getMyProducts));

router.post(
  '/products',
  authenticate,
  validateBody(addMyProductsSchema),
  ctrlWrapper(addMyProductsController),
);

router.delete(
  '/products/:productId',
  authenticate,
  ctrlWrapper(deleteMyProductController),
);

router.get(
  '/calories-today',
  authenticate,
  ctrlWrapper(countMyCaloriesController),
);

export default router;
