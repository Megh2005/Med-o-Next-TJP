import { connectDB } from "@/lib/db";
import { ApiResponse } from "@/utils/ApiResponse";
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PrescriptionModel } from "@/models/Prescription";
import { uploadToCloudinary } from "@/lib/cloudinary/uploadToCloudinary";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { UserModel } from "@/models/User";
import { authOptions } from "@/lib/auth";

function fileToGenerativePart(base64Data: string, mimeType: string) {
  return {
    inlineData: {
      data: base64Data,
      mimeType,
    },
  };
}

export async function POST(req: NextRequest) {
  await connectDB();

  const transaction = await mongoose.startSession();

  try {
    const user = (await getServerSession(authOptions))?.user;

    if (!user) {
      throw new Error("Unauthorized user");
    }

    const formData = await req.formData();
    const imgFile = formData.get("imgFile") as File;

    if (!imgFile) {
      throw new Error("Image file not found");
    }

    transaction.startTransaction();

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });

    const buffer = Buffer.from(await imgFile.arrayBuffer());
    const base64Data = buffer.toString("base64");

    const prompt = `
    You are an expert in understanding handwritten medical prescriptions and act as a pharmacist.
    We will upload an image as a medical prescription, and you will extract all the medicine names based on the uploaded prescription image.
  
    Structure the output as an object with the following fields:
    - "title": A brief title for the prescription.
    - "error": A boolean indicating if an error occurred.
    - "errorMessage": If "error" is true, provide a brief message describing the error; otherwise, leave this empty.
    - "medicines": An array of objects, where each object contains:
        - "name": The name of the medicine.
        - "details": An object containing:
            - "uses": A brief sentence on the use of the medicine.
            - "sideEffects": An array of 3 possible side effects.
            - "safetyAdvice": A brief sentence on safety advice.
  
    Example output for successful extraction:
    {
    "title": "Title of the prescription",
      "error": false,
      "errorMessage": "",
      "medicines": [
        {
          "name": "Medicine Name 1",
          "details": {
            "uses": "Used to treat high blood pressure.",
            "sideEffects": ["Dizziness", "Nausea", "Headache"],
            "safetyAdvice": "Avoid consuming alcohol while taking this medication."
          }
        },
        {
          "name": "Medicine Name 2",
          "details": {
            "uses": "Helps relieve pain and inflammation.",
            "sideEffects": ["Upset stomach", "Drowsiness", "Dry mouth"],
            "safetyAdvice": "Take with food to reduce stomach discomfort."
          }
        }
      ]
    }
  
    Example output if an error occurs:
    {
      "title": "",
      "error": true,
      "errorMessage": "An error occurred while processing the image. Please try again later.",
      "medicines": []
    }
  `;

    const imagePart = fileToGenerativePart(base64Data, imgFile.type);

    const result = await model.generateContent([prompt, imagePart]);
    const content = JSON.parse(
      result.response.text().replace(/```json\s*|\s*```/g, "")
    );

    if (content.error) {
      throw new Error(content.errorMessage);
    }

    const mimeType = imgFile.type;
    const encoding = "base64";
    const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;

    const res = await uploadToCloudinary(fileUri, "prescriptions");

    if (!res) {
      throw new Error("Failed to upload image to Cloudinary");
    }

    const currentUser = await UserModel.findOne({ email: user.email });

    if (!currentUser) {
      throw new Error("User not found");
    }

    await PrescriptionModel.create({
      imageUrl: res.secure_url,
      content: JSON.stringify(content),
      prescriptionOf: currentUser._id,
    });

    await transaction.commitTransaction();

    return NextResponse.json(new ApiResponse(200, "Success", content), {
      status: 200,
    });
  } catch (error: unknown) {
    await transaction.abortTransaction();
    if (error instanceof Error) {
      return NextResponse.json(new ApiResponse(400, error.message, null), {
        status: 400,
      });
    } else {
      return NextResponse.json(
        new ApiResponse(400, "An unknown error occurred", null),
        { status: 400 }
      );
    }
  } finally {
    transaction.endSession();
  }
}

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const user = (await getServerSession(authOptions))?.user;

    if (!user) {
      throw new Error("Unauthorized user");
    }

    const currentUser = await UserModel.findOne({ email: user.email });

    if (!currentUser) {
      throw new Error("User not found");
    }

    const url = new URL(req.url);

    const page = parseInt(url.searchParams.get("page") as string);
    const pageSize = parseInt(url.searchParams.get("pageSize") as string) || 10;

    const prescriptions = await PrescriptionModel.aggregate([
      {
        $match: {
          prescriptionOf: new mongoose.Types.ObjectId(currentUser._id),
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $facet: {
          metadata: [{ $count: "totalCount" }],
          data: [{ $skip: (page - 1) * pageSize }, { $limit: pageSize }],
        },
      },
      {
        $project: {
          data: 1,
          totalCount: {
            $ifNull: [{ $arrayElemAt: ["$metadata.totalCount", 0] }, 0],
          },
        },
      },
    ]);

    const response = {
      data: prescriptions[0].data,
      metadata: {
        totalCount: prescriptions[0].totalCount,
        page,
        pageSize,
        hasNextPage: prescriptions[0].totalCount - page * pageSize > 0,
      },
    };

    return NextResponse.json(new ApiResponse(200, "Success", response), {
      status: 200,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(new ApiResponse(400, error.message, null), {
        status: 400,
      });
    } else {
      return NextResponse.json(
        new ApiResponse(400, "An unknown error occurred", null),
        { status: 400 }
      );
    }
  }
}
