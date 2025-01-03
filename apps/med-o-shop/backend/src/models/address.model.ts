import { Address } from "../lib/interfaces/Address";
import mongoose, { Model, Schema } from "mongoose";

const addressSchema: Schema<Address> = new Schema<Address>(
  {
    addressOf: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    houseNumber: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    landmark: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const AddressModel =
  (mongoose.models.Address as Model<Address>) ||
  mongoose.model<Address>("Address", addressSchema);
