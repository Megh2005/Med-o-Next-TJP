import { CartData } from "../lib/interfaces/Cart";
import { CustomRequest } from "../lib/interfaces/CustomRequest";
import { CartModel } from "../models/cart.model";
import { ProductModel } from "../models/product.model";
import ApiResponse from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { Response } from "express";

export const addToCart = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const userId = req.userId;

    if (!userId) {
      return res
        .status(400)
        .json(new ApiResponse(400, "User id is required", null));
    }

    const { productId, quantity } = req.body;

    if (!productId) {
      return res
        .status(400)
        .json(new ApiResponse(400, "Product id is required", null));
    }

    const productInfo = await ProductModel.findOne({ _id: productId });

    if (!productInfo) {
      return res
        .status(404)
        .json(new ApiResponse(404, "Product not found", null));
    }

    const alreadyExists = await CartModel.findOne({
      addedBy: userId,
      products: { $elemMatch: { product: productId } },
    });

    if (alreadyExists) {
      return res
        .status(200)
        .json(new ApiResponse(200, "Product already exists in cart", null));
    }

    const cart = await CartModel.findOne({ addedBy: userId });

    let currentTotalAmount = cart?.totalAmount
      ? parseFloat(cart.totalAmount)
      : 0;

    if (isNaN(currentTotalAmount)) {
      currentTotalAmount = 0; // Handle any cases where the conversion fails
    }

    // Calculate the new total amount
    const newTotalAmount =
      Math.round(
        (currentTotalAmount + quantity * parseFloat(productInfo.price)) * 100
      ) / 100;

    const response = await CartModel.findOneAndUpdate(
      {
        addedBy: userId,
      },
      {
        $push: { products: { product: productId, quantity } },
        $set: {
          totalAmount: newTotalAmount.toString(),
        },
      },
      {
        upsert: true,
        new: true,
      }
    );

    if (!response) {
      return res
        .status(500)
        .json(new ApiResponse(500, "Error updating cart", null));
    }

    const product = await ProductModel.findOne({ _id: productId }).select(
      "name genericName imageUrl _id price"
    );

    return res
      .status(201)
      .json(new ApiResponse(201, "Product Added to cart", product));
  }
);

export const getCartItems = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const userId = req.userId;
    if (!userId) {
      return res
        .status(400)
        .json(new ApiResponse(400, "User id is required", null));
    }

    const response = await CartModel.findOne({ addedBy: userId }).populate({
      path: "products.product",
      model: ProductModel,
      select: "name genericName imageUrl _id price",
    });

    return res
      .status(200)
      .json(new ApiResponse(200, "Cart Items fetched", response));
  }
);

export const increaseItemQuantity = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const userId = req.userId;
    if (!userId) {
      return res
        .status(400)
        .json(new ApiResponse(400, "User id is required", null));
    }

    const { productId } = req.body;

    if (!productId) {
      return res
        .status(400)
        .json(new ApiResponse(400, "Product id is required", null));
    }

    const productInfo = await ProductModel.findOne({ _id: productId });

    if (!productInfo) {
      return res
        .status(404)
        .json(new ApiResponse(404, "Product not found", null));
    }

    const cart = await CartModel.findOne({ addedBy: userId });

    let currentTotalAmount = cart?.totalAmount
      ? parseFloat(cart.totalAmount)
      : 0;

    if (isNaN(currentTotalAmount)) {
      currentTotalAmount = 0; // Handle any cases where the conversion fails
    }

    // Calculate the new total amount
    const newTotalAmount =
      Math.round((currentTotalAmount + parseFloat(productInfo.price)) * 100) /
      100;

    const response = await CartModel.findOneAndUpdate(
      {
        addedBy: userId,
        "products.product": productId,
      },
      { $inc: { "products.$.quantity": 1 }, totalAmount: newTotalAmount },
      {
        new: true,
      }
    );

    if (!response) {
      return res
        .status(500)
        .json(new ApiResponse(500, "Error updating cart", null));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "Product quantity increased", response));
  }
);

export const decreaseItemQuantity = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const userId = req.userId;
    if (!userId) {
      return res
        .status(400)
        .json(new ApiResponse(400, "User id is required", null));
    }

    const { productId } = req.body;

    if (!productId) {
      return res
        .status(400)
        .json(new ApiResponse(400, "Product id is required", null));
    }

    const productInfo = await ProductModel.findOne({ _id: productId });

    if (!productInfo) {
      return res
        .status(404)
        .json(new ApiResponse(404, "Product not found", null));
    }

    const cart = await CartModel.findOne({
      addedBy: userId,
      products: { $elemMatch: { product: productId } },
    });

    if (!cart) {
      return res
        .status(404)
        .json(new ApiResponse(404, "Product not found in cart", null));
    }

    const product = cart.products.find((med) => med.product === productId);

    if (cart.products.length === 1 && cart.products[0].quantity === 1) {
      await CartModel.findOneAndDelete({ addedBy: userId });
      return res
        .status(200)
        .json(
          new ApiResponse(200, "Product removed from cart successfully", null)
        );
    } else if (product?.quantity === 1) {
      const newTotalAmount =
        Math.round(
          (parseFloat(cart.totalAmount) - parseFloat(productInfo.price)) * 100
        ) / 100;

      await CartModel.findOneAndUpdate(
        {
          addedBy: userId,
        },
        {
          $pull: { products: { product: productId } },
          totalAmount: newTotalAmount.toString(),
        },
        {
          new: true,
        }
      );
      return res
        .status(200)
        .json(
          new ApiResponse(200, "Product removed from cart successfully", null)
        );
    } else {
      const newTotalAmount =
        Math.round(
          (parseFloat(cart.totalAmount) - parseFloat(productInfo.price)) * 100
        ) / 100;

      const response = await CartModel.findOneAndUpdate(
        {
          addedBy: userId,
          "products.product": productId,
        },
        {
          $inc: { "products.$.quantity": -1 },
          totalAmount: newTotalAmount.toString(),
        },
        {
          new: true,
        }
      );

      if (!response) {
        return res
          .status(500)
          .json(new ApiResponse(500, "Error updating cart", null));
      }

      return res
        .status(200)
        .json(new ApiResponse(200, "Product quantity decreased", response));
    }
  }
);

export const removeItemFromCart = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const userId = req.userId;
    if (!userId) {
      return res
        .status(400)
        .json(new ApiResponse(400, "User id is required", null));
    }

    const { productId } = req.params;

    if (!productId) {
      return res
        .status(400)
        .json(new ApiResponse(400, "Product id is required", null));
    }

    const cart = await CartModel.findOne({
      addedBy: userId,
      products: { $elemMatch: { product: productId } },
    });

    if (!cart) {
      return res
        .status(404)
        .json(new ApiResponse(404, "Product not found in cart", null));
    }

    if (cart.products.length === 1) {
      await CartModel.findOneAndDelete({ addedBy: userId });
      return res
        .status(200)
        .json(new ApiResponse(200, "Item removed from cart", null));
    }

    const product = await ProductModel.findOne({ _id: productId });

    if (!product) {
      return res
        .status(404)
        .json(new ApiResponse(404, "Product not found", null));
    }

    const newTotalAmount =
      Math.round(
        (parseFloat(cart.totalAmount) -
          parseFloat(product.price) *
            (cart.products.find((med) => med.product.toString() === productId)
              ?.quantity || 0)) *
          100
      ) / 100;

    const deletedItem = await CartModel.findOneAndUpdate(
      {
        addedBy: userId,
      },
      {
        $pull: {
          products: {
            product: productId,
          },
        },
        $set: {
          totalAmount: newTotalAmount.toString(),
        },
      },
      {
        new: true,
      }
    );

    if (!deletedItem) {
      return res
        .status(500)
        .json(new ApiResponse(500, "Error removing item from cart", null));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "Item removed from cart", deletedItem));
  }
);
