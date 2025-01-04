import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import signupSchema from "../lib/schemas/signup.schema";
import ApiResponse from "../utils/ApiResponse";
import { UserModel } from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";

export const signup = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, confirmPassword, phoneNumber } = req.body;

  const { success } = signupSchema.safeParse({
    name,
    email,
    password,
    confirmPassword,
    phoneNumber,
  });

  if (!success) {
    return res
      .status(400)
      .json(new ApiResponse(400, "Invalid request body", null));
  }

  const isExistingUser = await UserModel.findOne({
    $or: [{ email }, { phoneNumber }],
  });

  if (isExistingUser) {
    return res
      .status(400)
      .json(new ApiResponse(400, "User already exists", null));
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  let isAdmin = false;

  if (email === process.env.ADMIN_EMAIL) {
    isAdmin = true;
  }

  const createdUser = await UserModel.create({
    name,
    email,
    password: hashedPassword,
    phoneNumber,
    isAdmin,
  });

  if (!createdUser) {
    return res
      .status(500)
      .json(new ApiResponse(500, "Error creating user", null));
  }

  return res.status(201).json(
    new ApiResponse(201, "User created successfully", {
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      phoneNumber: createdUser.phoneNumber,
      isAdmin: createdUser.isAdmin,
    })
  );
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(404).json(new ApiResponse(404, "User not found", null));
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res
      .status(400)
      .json(new ApiResponse(400, "Invalid credentials", null));
  }

  // generate token
  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET!
  );

  return res.status(200).json(
    new ApiResponse(200, "Login successful", {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
      },
      token,
    })
  );
});

export const checkAdmin = asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.body;

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);

  const isAdmin = (decodedToken as JwtPayload).isAdmin;

  return res.status(200).json(new ApiResponse(200, "Success", { isAdmin }));
});
