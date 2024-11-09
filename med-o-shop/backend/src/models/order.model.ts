import { Order } from "../lib/interfaces/Order";
import mongoose, { Model, Schema } from "mongoose";

const orderSchema: Schema<Order> = new Schema<Order>(
  {
    orderedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true },
      },
    ],
    total: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
    address: { type: Schema.Types.ObjectId, ref: "Address", required: true },
    transactionId: { type: String, required: true },
  },
  { timestamps: true }
);

export const OrderModel =
  (mongoose.models.Order as Model<Order>) ||
  mongoose.model<Order>("Order", orderSchema);
