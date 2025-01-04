import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import ApiResponse from "../utils/ApiResponse";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserModel } from "../models/user.model";
import { CustomRequest } from "../lib/interfaces/CustomRequest";

export const verifyToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json(new ApiResponse(401, "Unauthorized", null));
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);

    if (!decodedToken) {
      return res.status(400).json(new ApiResponse(400, "Invalid Token", null));
    }

    const user = await UserModel.findById(
      (decodedToken as JwtPayload).id
    ).select("-password");
    decodedToken;

    if (!user) {
      return res.status(404).json(new ApiResponse(404, "User not found", null));
    }

    (req as CustomRequest).isAdmin = (decodedToken as JwtPayload).isAdmin;
    (req as CustomRequest).userId = (decodedToken as JwtPayload).id.toString();
    next();
  }
);
