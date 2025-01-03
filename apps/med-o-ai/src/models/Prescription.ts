import { Prescription } from "@/interfaces/Prescription";
import mongoose, { Model, Schema } from "mongoose";

const prescriptionSchema: Schema<Prescription> = new Schema<Prescription>(
  {
    imageUrl: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      trim: true,
    },
    prescriptionOf: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const PrescriptionModel =
  (mongoose.models.Prescription as Model<Prescription>) ||
  mongoose.model<Prescription>("Prescription", prescriptionSchema);
