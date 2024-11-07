"use server";

import { ResponseModel } from "@/models/Response";
import { connectDB } from "../db";

export const submitContactForm = async (userResponse: {
  name: string;
  gender: string;
  contactNumber: string;
  email: string;
  state: string;
  city: string;
  address: string;
}) => {
  try {
    await connectDB();

    await ResponseModel.create(userResponse);

    return {
      success: true,
      message: "Response captured successfully",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    } else {
      return {
        success: false,
        message: "Error capturing response",
      };
    }
  }
};
