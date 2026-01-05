import { myProductsModel } from '../db/models/myProductsModel.js';
import ProductsModel from '../db/models/productsModel.js';
import { userModel } from '../db/models/userModel.js';

export const getUserById = async (userId) => {
  return await userModel.findOne({ _id: userId });
};

export const getNotAllowedProducts = async (bloodType) => {
  return await ProductsModel.distinct('categories', {
    [`groupBloodNotAllowed.${bloodType}`]: true,
  });
};

export const getProductsForDateService = async (userId, date) => {
  return myProductsModel
    .find({
      userId: userId,
      date: date,
    })
    .populate({ path: 'productId', select: '-groupBloodNotAllowed -weight' })
    .select('-__v');
};
