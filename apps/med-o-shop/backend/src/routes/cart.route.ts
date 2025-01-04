import { Router } from "express";
import {
  addToCart,
  decreaseItemQuantity,
  getCartItems,
  increaseItemQuantity,
  removeItemFromCart,
} from "../controllers/cart.controller";
import { verifyToken } from "../middlewares/auth.middleware";

const cartRouter = Router();

cartRouter.post("/", verifyToken, addToCart);
cartRouter.get("/", verifyToken, getCartItems);
cartRouter.put("/increase-item", verifyToken, increaseItemQuantity);
cartRouter.put("/decrease-item", verifyToken, decreaseItemQuantity);
cartRouter.delete("/remove-item/:productId", verifyToken, removeItemFromCart);

export default cartRouter;
