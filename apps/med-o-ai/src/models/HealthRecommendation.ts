import { HealthRecommendation } from "@/interfaces/HealthRecommendation";
import mongoose, { Model, Schema } from "mongoose";

const healthRecommendationSchema: Schema<HealthRecommendation> =
  new Schema<HealthRecommendation>(
    {
      content: {
        type: String,
        trim: true,
      },
      recommendationFor: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
    { timestamps: true }
  );

export const HealthRecommendationModel =
  (mongoose.models.HealthRecommendation as Model<HealthRecommendation>) ||
  mongoose.model<HealthRecommendation>(
    "HealthRecommendation",
    healthRecommendationSchema
  );
