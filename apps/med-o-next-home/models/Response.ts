import mongoose, { Schema } from "mongoose";

export const responseSchema = new Schema(
  {
    name: { type: String, trim: true, required: true },
    gender: { type: String, trim: true, required: true },
    contactNumber: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true },
    state: { type: String, trim: true, required: true },
    city: { type: String, trim: true, required: true },
    address: { type: String, trim: true, required: true },
  },
  { timestamps: true }
);

export const ResponseModel =
  mongoose.models.Response || mongoose.model("Response", responseSchema);
