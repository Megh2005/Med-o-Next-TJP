import { connectDB } from "@/lib/db";
import { HealthRecommendationModel } from "@/models/HealthRecommendation";
import { ApiResponse } from "@/utils/ApiResponse";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
      throw new Error("ID not found");
    }

    const recommendation = await HealthRecommendationModel.findById(id);

    return NextResponse.json(new ApiResponse(200, "Success", recommendation), {
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
