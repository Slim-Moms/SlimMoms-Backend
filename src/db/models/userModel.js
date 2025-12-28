import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

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

usersSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

usersSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export const userModel = model('User', usersSchema);
