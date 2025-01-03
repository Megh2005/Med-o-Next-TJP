import { User } from "../lib/interfaces/User";
import mongoose, { Model, Schema } from "mongoose";

const userSchema: Schema<User> = new Schema<User>(
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
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

export const UserModel =
  (mongoose.models.User as Model<User>) ||
  mongoose.model<User>("User", userSchema);
