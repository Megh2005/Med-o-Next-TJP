import { CustomRequest } from "../lib/interfaces/CustomRequest";
import addressSchema from "../lib/schemas/address.schema";
import { AddressModel } from "../models/address.model";
import ApiResponse from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { Response } from "express";

export const getAddresses = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const userId = req.userId;

    const addresses = await AddressModel.find({ addressOf: userId });

    return res
      .status(200)
      .json(new ApiResponse(200, "Addresses fetched", addresses));
  }
);

export const addNewAddress = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const userId = req.userId;
    const formData = req.body;

    const billingAddress = {
      fullName: formData.fullName,
      phoneNumber: formData.phoneNumber,
      pincode: formData.pincode,
      state: formData.state,
      city: formData.city,
      houseNumber: formData.houseNumber,
      street: formData.street,
      landmark: formData.landmark,
    };

    const { success } = addressSchema.safeParse(billingAddress);

    if (!success) {
      return res
        .status(400)
        .json(new ApiResponse(400, "Invalid request body", null));
    }

    const savedAddress = await AddressModel.create({
      ...billingAddress,
      addressOf: userId,
    });

    if (!savedAddress) {
      return res
        .status(500)
        .json(new ApiResponse(500, "Error saving address", null));
    }

    return res
      .status(201)
      .json(new ApiResponse(201, "Address added successfully", savedAddress));
  }
);
