"use client";

import RecommendationDetailsShimmer from "@/components/RecommendationDetailsShimmer";
import {
  Card,
  CardDescription,
  CardTitle,
} from "@/components/ui/card-hover-effect";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { HealthRecommendationContent } from "@/interfaces/HealthRecommendation";
import axios from "axios";
import { useParams } from "next/navigation";
import { useRef } from "react";
import { useQuery } from "react-query";

const Recommendation = () => {
  const { id } = useParams();
  const ref = useRef<HTMLDivElement>(null);

  const {
    data: content,
    isLoading,
    status,
  } = useQuery<HealthRecommendationContent>({
    queryKey: ["recommendation", id],
    queryFn: async () => {
      const res = await axios.get(`/api/recommendation/${id}`);
      return JSON.parse(res.data.data.content) as HealthRecommendationContent;
    },
    staleTime: Infinity,
  });

  /*  async function handleMint() {
    if(!ref.current) return;
    const dataUrl = await toPng(ref.current, { cacheBust: true });
    console.log("Data URL generated:", dataUrl);
  }  */

  if (isLoading)
    return (
      <div className="w-full max-w-3xl mx-auto my-6">
        <RecommendationDetailsShimmer />
      </div>
    );

  return (
    <div>
      <div className="w-full max-w-3xl mx-auto my-6">
        {content && status === "success" && (
          <div ref={ref}>
            <Card>
              <CardTitle className="text-2xl text-white">
                {content.title}
              </CardTitle>
              <CardDescription className="text-white text-base">
                {content.introduction}
              </CardDescription>
              <div>
                {content.sections.map((section, index) => (
                  <div key={index} className="my-4">
                    <h1 className="text-2xl font-bold bg-white text-black px-2 w-max rounded-sm">
                      {section.title}
                    </h1>
                    {section.items.map((item, index) => (
                      <div key={index} className="my-4">
                        <TextGenerateEffect
                          words={item.subtitle}
                          duration={0.9}
                          className="list-item list-disc ml-4 text-white text-lg font-bold"
                        />
                        <p className="text-neutral-200 text-base">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className="my-2">
                <p className="text-purple-300 font-bold">* {content.note}</p>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommendation;
