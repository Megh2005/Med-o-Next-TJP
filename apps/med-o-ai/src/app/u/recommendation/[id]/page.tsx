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
import { useCallback, useRef } from "react";
import { useQuery } from "react-query";
import { toPng } from "html-to-image";

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

  const downloadRecommendation = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${content?.title}-${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

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
          <>
            <div className="my-6 flex justify-center">
              <button
                onClick={downloadRecommendation}
                className="hover:-translate-y-1 transition duration-150 ease-in-out z-50 relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
              >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="gap-2 inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                  Download Recommendation
                </span>
              </button>
            </div>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Recommendation;
