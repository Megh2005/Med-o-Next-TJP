import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import { addNewAddress, getAddresses } from "../controllers/address.controller";

const addressRouter = Router();

addressRouter.get("/", verifyToken, getAddresses);
addressRouter.post("/", verifyToken, addNewAddress);

export default addressRouter;
