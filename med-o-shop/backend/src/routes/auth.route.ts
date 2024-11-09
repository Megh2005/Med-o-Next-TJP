import { Router } from "express";
import { checkAdmin, login, signup } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/check-admin", checkAdmin);

export default authRouter;
