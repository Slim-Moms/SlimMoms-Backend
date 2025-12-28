import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import { myProductsModel } from '../../db/models/myProductsModel.js';

export const deleteMyProductController = async (request, response, next) => {
  const { date } = request.query;
  const { productId } = request.params;
  const user = request.user._id;

  if (!date || isNaN(Date.parse(date))) {
    return next(createHttpError(400, 'Invalid date'));
  }

  if (!mongoose.isValidObjectId(productId)) {
    return next(createHttpError(400, 'Invalid product id'));
  }

  const searchDate = new Date(date);

  const deleteProduct = await myProductsModel.findOneAndDelete({
    _id: productId,
    userId: user,
    date: searchDate,
  });

  if (!deleteProduct) {
    return next(
      createHttpError(
        404,
        `No product found with this id ${productId} or specified date ${date}!`,
      ),
    );
  }

  response.status(200).send({
    message: 'Product deleted successfully',
    status: 200,
    product: deleteProduct,
  });
};
