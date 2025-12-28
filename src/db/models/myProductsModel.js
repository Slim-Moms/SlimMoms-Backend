import { model, Schema } from 'mongoose';

const myProductsSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'products',
    required: [true, 'Product id is required'],
  },
  productWeight: {
    type: Number,
    required: [true, 'Product weight is required'],
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'userModel',
    required: [true, 'User id is required'],
  },
});

export const myProductsModel = model('myProductsModel', myProductsSchema);
