import { model, Schema } from 'mongoose';

const usersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    userData: {
      height: {
        type: Number,
        default: null,
      },
      age: {
        type: Number,
        default: null,
      },
      currentWeight: {
        type: Number,
        default: null,
      },
      desiredWeight: {
        type: Number,
        default: null,
      },
      bloodType: {
        type: Number,
        default: null,
      },
      dailyRate: {
        type: Number,
        default: null,
      },
      notAllowedProducts: {
        type: [String],
        default: [],
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const userModel = model('User', usersSchema);
