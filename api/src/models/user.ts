import { IUser } from '../interfaces/IUser';
import mongoose from 'mongoose';

const User = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Please enter a full name'],
      index: true,
    },

    email: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
    },

    birthday: {
      type: Date,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      zip: { type: Number, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
    },

    securityQuestions: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
      },
    ],

    picture: String,

    password: String,

    salt: String,

    role: {
      type: String,
      default: 'user',
    },
  },
  { timestamps: true },
);

export default mongoose.model<IUser & mongoose.Document>('User', User);
