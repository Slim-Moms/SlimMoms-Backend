import createHttpError from 'http-errors';
import { getNotAllowedProducts } from '../services/userServices.js';
import { calorieCalculator } from '../utils/calorieCalculator.js';

export const getDailyRateController = async (request, response) => {
  const currentWeight = Number(request.body.currentWeight);
  const height = Number(request.body.height);
  const age = Number(request.body.age);
  const desiredWeight = Number(request.body.desiredWeight);
  const bloodType = request.body.bloodType;

  console.log(currentWeight, height, age, desiredWeight);

  const notAllowedProducts = await getNotAllowedProducts(bloodType);

  const dailyRate = calorieCalculator({
    currentWeight,
    height,
    age,
    desiredWeight,
  });

  response.status(200).send({
    message: 'Daily rate calculated successfully',
    status: 200,
    data: { dailyRate, notAllowedProducts },
  });
};

export const getUserDailyRateController = async (request, response, next) => {
  if (!request.user) {
    next(createHttpError(401, 'Unauthorized'));
  }

  const currentWeight = Number(request.user.userData.currentWeight);
  const height = Number(request.user.userData.height);
  const age = Number(request.user.userData.age);
  const desiredWeight = Number(request.user.userData.desiredWeight);
  const bloodType = request.user.userData.bloodType;

  const notAllowedProducts = await getNotAllowedProducts(bloodType);

  const dailyRate = calorieCalculator({
    currentWeight,
    height,
    age,
    desiredWeight,
  });

  response.status(200).send({
    message: 'Daily rate calculated successfully',
    status: 200,
    data: { dailyRate, notAllowedProducts },
  });
};
