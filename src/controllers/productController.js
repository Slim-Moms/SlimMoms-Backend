import createError from 'http-errors';
import productsModel from '../db/models/productsModel.js';

export const getProductsByQuery = async (request, response, next) => {
  let { title } = request.query;

  if (!title) {
    return next(createError(400, 'Invalid query'));
  }

  const regex = new RegExp(title || '', 'i');
  const data = await productsModel.find({ title: regex }).limit(10);
  response.status(200).send({
    message: 'Products fetched successfully',
    status: 200,
    data,
  });
};
