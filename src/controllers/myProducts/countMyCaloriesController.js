import createError from 'http-errors';
import { getProductsForDateService } from '../../services/userServices.js';

export const countMyCaloriesController = async (request, response, next) => {
  const { date } = request.query;
  const userId = request.user._id;
  console.log(date);

  if (!date || isNaN(Date.parse(date))) {
    return next(createError(400, 'Invalid date'));
  }

  const products = await getProductsForDateService(userId, date);

  if (products.length === 0) {
    return response.status(200).send({
      message: `No products found for this date: ${date}`,
      status: 200,
      calories: 0,
    });
  }

  const totalCalories = products.reduce((acc, product) => {
    const productCalories = product.productId.calories / 100;
    return acc + productCalories * product.productWeight;
  }, 0);

  response.status(200).send({
    message: `Calories calculated successfully`,
    status: 200,
    date: date,
    calories: Math.round(totalCalories),
  });
};
