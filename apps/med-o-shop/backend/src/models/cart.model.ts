import { Cart } from "../lib/interfaces/Cart";
import mongoose, { Model, Schema } from "mongoose";

const cartSchema: Schema<Cart> = new Schema<Cart>(
  {
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true },
      },
    ],
    addedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    totalAmount: { type: String, required: true },
  },
  { timestamps: true }
);

export const CartModel =
  (mongoose.models.Cart as Model<Cart>) ||
  mongoose.model<Cart>("Cart", cartSchema);
