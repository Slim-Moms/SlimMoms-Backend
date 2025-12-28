import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import { myProductsModel } from '../../db/models/myProductsModel.js';

export const addMyProductsController = async (request, response, next) => {
  try {
    const { productId, productWeight, date } = request.body;
    const user = request.user._id;

    if (!user) {
      return next(createHttpError(401, 'User not found'));
    }

    if (!mongoose.isValidObjectId(productId)) {
      return next(createHttpError(400, 'Invalid product id'));
    }

    if (!date || isNaN(Date.parse(date))) {
      return next(createHttpError(400, 'Invalid date'));
    }

    const newProduct = await myProductsModel.create({
      productId,
      productWeight,
      date: date,
      userId: user,
    });

    response.status(201).send({
      message: 'Product add to my products successfully',
      status: 201,
      product: newProduct,
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
};
