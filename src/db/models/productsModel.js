import { model, Schema } from 'mongoose';

const productSchema = new Schema(
  {
    categories: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
    },
    groupBloodNotAllowed: {
      1: { type: Boolean, required: true },
      2: { type: Boolean, required: true },
      3: { type: Boolean, required: true },
      4: { type: Boolean, required: true },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const ProductsModel = model('products', productSchema);

export default ProductsModel;
