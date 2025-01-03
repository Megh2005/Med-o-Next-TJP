import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getProductDetails,
  getProducts,
  updateProduct,
} from "../controllers/admin.controller";
import { upload } from "../middlewares/multer.middleware";

const adminRouter = Router();

adminRouter.post("/add-product", upload.single("image"), addProduct);
adminRouter.post(
  "/update-product/:productId",
  upload.single("image"),
  updateProduct
);
adminRouter.get("/products", getProducts);
adminRouter.get("/product-details/:productId", getProductDetails);
adminRouter.delete("/delete-product/:productId", deleteProduct);

export default adminRouter;
