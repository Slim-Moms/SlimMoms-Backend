import createHttpError from 'http-errors';
import { getNotAllowedProducts } from '../services/userServices.js';
import { calorieCalculator } from '../utils/calorieCalculator.js';
import { userModel } from '../db/models/userModel.js';

export const getDailyRateController = async (req, res) => {
  const { currentWeight, height, age, desiredWeight, bloodType } = req.body;

  const notAllowedProducts = await getNotAllowedProducts(bloodType);

  const dailyRate = calorieCalculator({
    currentWeight: Number(currentWeight),
    height: Number(height),
    age: Number(age),
    desiredWeight: Number(desiredWeight),
  });

  res.status(200).send({
    status: 200,
    message: 'Daily rate calculated successfully',
    data: { dailyRate, notAllowedProducts },
  });
};

export const getUserDailyRateController = async (req, res, next) => {
  if (!req.user) {
    return next(createHttpError(401, 'Unauthorized'));
  }

  const { currentWeight, height, age, desiredWeight, bloodType } = req.body;

  const dailyRate = calorieCalculator({
    currentWeight: Number(currentWeight),
    height: Number(height),
    age: Number(age),
    desiredWeight: Number(desiredWeight),
  });

  const notAllowedProducts = await getNotAllowedProducts(bloodType);

  await userModel.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        userData: {
          currentWeight,
          height,
          age,
          desiredWeight,
          bloodType,
          dailyRate,
          notAllowedProducts,
        },
      },
    },
    { new: true },
  );

  res.status(200).send({
    status: 200,
    message: 'Daily rate calculated and user profile updated successfully',
    data: { dailyRate, notAllowedProducts },
  });
};
