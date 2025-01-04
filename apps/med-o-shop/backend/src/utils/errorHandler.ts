import { NextFunction, Request, Response } from "express";
import ApiSuccess from "./ApiResponse";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Handle the error
  res
    .status(err.statusCode || 500)
    .json(new ApiSuccess(err.status || 500, err.message, null));
};

export default errorHandler;
