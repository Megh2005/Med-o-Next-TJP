import { CustomRequest } from "../lib/interfaces/CustomRequest";
import { CartModel } from "../models/cart.model";
import { OrderModel } from "../models/order.model";
import { UserModel } from "../models/user.model";
import ApiResponse from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { Response } from "express";

export const getOrderInfo = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const userId = req.userId;

    const userInfo = await UserModel.findById(userId);

    if (!userInfo) {
      return res.status(404).json(new ApiResponse(404, "User not found", null));
    }

    const cartInfo = await CartModel.findOne({ addedBy: userId });

    if (!cartInfo) {
      return res.status(404).json(new ApiResponse(404, "Cart not found", null));
    }

    return res.status(200).json(
      new ApiResponse(200, "Cart info fetched", {
        orderedBy: userId,
        items: cartInfo.products,
        total: cartInfo.totalAmount,
        phoneNumber: userInfo.phoneNumber,
      })
    );
  }
);

export const placeOrder = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const { orderInfo } = req.body;

    if (!orderInfo) {
      return res
        .status(400)
        .json(new ApiResponse(400, "Invalid order info", null));
    }

    const transactionId = `Tr-${new Date().getTime()}-${orderInfo.orderedBy}`;

    const newOrder = await OrderModel.create({
      address: orderInfo.address,
      items: orderInfo.items,
      orderedBy: orderInfo.orderedBy,
      status: "completed",
      total: orderInfo.total,
      transactionId,
    });

    if (!newOrder) {
      return res.status(500).json(new ApiResponse(500, "Order failed", null));
    }

    await CartModel.findOneAndDelete({ addedBy: orderInfo.orderedBy });

    return res.status(201).json(new ApiResponse(201, "Order placed", null));
  }
);
