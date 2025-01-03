import { Product } from "../lib/interfaces/Product";
import mongoose, { Model, Schema } from "mongoose";

const productSchema: Schema<Product> = new Schema<Product>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    genericName: {
      type: String,
      required: true,
      trim: true,
    },
    manufacturer: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    dosageForm: {
      type: String,
      required: true,
    },
    strength: {
      type: String,
      required: true,
    },
    packSize: {
      type: Number,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    prescriptionRequired: {
      type: Boolean,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    manufacturedDate: {
      type: Date,
      required: true,
    },
    batchNumber: {
      type: String,
      required: true,
    },
    activeIngredients: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const ProductModel =
  (mongoose.models.Product as Model<Product>) ||
  mongoose.model<Product>("Product", productSchema);
