import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import { getOrderInfo, placeOrder } from "../controllers/order.controller";

const orderRouter = Router();

orderRouter.get("/", verifyToken, getOrderInfo);
orderRouter.post("/", verifyToken, placeOrder);

export default orderRouter;
