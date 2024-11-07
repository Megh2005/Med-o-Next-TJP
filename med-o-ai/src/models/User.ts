import { User } from "@/interfaces/User";
import mongoose, { Model, Schema } from "mongoose";

const userSchema: Schema<User> = new Schema<User>(
  {
    email: {
      type: String,
      trim: true,
      unique: true,
    },
    name: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export const UserModel =
  (mongoose.models.User as Model<User>) ||
  mongoose.model<User>("User", userSchema);
