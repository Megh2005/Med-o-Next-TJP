import mongoose, { Schema } from "mongoose";

export const responseSchema = new Schema(
  {
    name: { type: String, trim: true },
    gender: { type: String, trim: true },
    contactNumber: { type: String, trim: true },
    email: { type: String, trim: true },
    state: { type: String, trim: true },
    city: { type: String, trim: true },
    address: { type: String, trim: true },
  },
  { timestamps: true }
);

export const ResponseModel =
  mongoose.models.Response || mongoose.model("Response", responseSchema);
