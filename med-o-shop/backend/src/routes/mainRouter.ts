import { Router } from "express";
import authRouter from "./auth.route";
import adminRouter from "./admin.route";
import searchRouter from "./search.route";
import productRouter from "./product.route";
import cartRouter from "./cart.route";
import addressRouter from "./address.route";
import orderRouter from "./order.route";
import { verifyToken } from "../middlewares/auth.middleware";

const mainRouter = Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/admin", verifyToken, adminRouter);
mainRouter.use("/search", searchRouter);
mainRouter.use("/product", productRouter);
mainRouter.use("/cart", cartRouter);
mainRouter.use("/address", addressRouter);
mainRouter.use("/order", orderRouter);

export default mainRouter;
