import Joi from 'joi';

export const getDailyRateSchema = Joi.object({
  currentWeight: Joi.number().min(30).max(200).required(),
  height: Joi.number().min(100).max(210).required(),
  age: Joi.number().integer().min(15).max(100).required(),
  desiredWeight: Joi.number()
    .min(30)
    .max(200)
    .required()
    .when('currentWeight', {
      is: Joi.exist(),
      then: Joi.number().less(Joi.ref('currentWeight')).messages({
        'number.less': 'Desired weight must be less than current weight',
      }),
    }),
  bloodType: Joi.number().integer().min(1).max(4).required(),
});

export const addMyProductsSchema = Joi.object({
  productId: Joi.string().required(),
  productWeight: Joi.number().required(),
  date: Joi.date().required().messages({
    'date.base': 'Date must be a valid date',
    'date.format': 'Date must be in YYYY-MM-DD format',
  }),
});
