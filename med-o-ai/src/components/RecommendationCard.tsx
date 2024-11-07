import {
  HealthRecommendation,
  HealthRecommendationContent,
} from "@/interfaces/HealthRecommendation";
import React from "react";
import { Card, CardDescription, CardTitle } from "./ui/card-hover-effect";

const RecommendationCard = ({
  recommendation,
}: {
  recommendation: HealthRecommendation;
}) => {
  const content: HealthRecommendationContent = JSON.parse(
    recommendation.content
  );

  return (
    <Card>
      <CardTitle className="text-white font-bold">{content.title}</CardTitle>
      <CardDescription className="line-clamp-2 text-neutral-200">
        {content.introduction}
      </CardDescription>
      <p className="text-neutral-400">{content.createdAt?.toString()}</p>
    </Card>
  );
};

export default RecommendationCard;
