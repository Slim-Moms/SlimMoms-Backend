import createHttpError from 'http-errors';
import { getProductsForDateService } from '../../services/userServices.js';

export const getMyProducts = async (request, response, next) => {
  const { date } = request.query;

  if (!date || isNaN(Date.parse(date))) {
    return next(createHttpError(400, 'Invalid date'));
  }

  const user = request.user._id;
  const dateFormatted = new Date(date).toISOString().split('T')[0];
  const products = await getProductsForDateService(user, dateFormatted);

  if (!products.length) {
    return response.status(200).send({
      message: `No products found for this date: ${dateFormatted} for user with id: ${user}!`,
      status: 200,
      products: [],
    });
  }

  return response.status(200).send({
    message: `Products for date: ${dateFormatted} for user with id: ${user} fetched successfully`,
    status: 200,
    products: products,
  });
};
