import { Router } from "express";
import { getProductById } from "../controllers/product.controller";

const productRouter = Router();

productRouter.get("/:productId", getProductById);

export default productRouter;
