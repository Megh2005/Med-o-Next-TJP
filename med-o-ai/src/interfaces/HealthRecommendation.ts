import { Schema } from "mongoose";

export interface HealthRecommendation {
  recommendationFor: Schema.Types.ObjectId;
  content: string;
}

export interface HealthRecommendationContent {
  title: string;
  introduction: string;
  note: string;
  sections: Sections[];
  createdAt?: Date;
}

interface Sections {
  title: string;
  items: Items[];
}

interface Items {
  subtitle: string;
  description: string;
}
