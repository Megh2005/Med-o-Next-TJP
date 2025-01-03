import { ProductModel } from "../models/product.model";
import ApiResponse from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";

export const getProductById = asyncHandler(
  async (req: Request, res: Response) => {
    const url = req.url;
    const id = url.split("/").pop();

    if (!id) {
      return res.json(new ApiResponse(400, "ID is required", null));
    }

    const response = await ProductModel.findById(id);

    if (!response) {
      return res.json(new ApiResponse(400, "Product not found", null));
    }

    return res.json(new ApiResponse(200, "Product found", response));
  }
);
