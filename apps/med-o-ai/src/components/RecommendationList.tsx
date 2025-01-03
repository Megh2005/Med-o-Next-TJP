"use client";

import { HealthRecommendation } from "@/interfaces/HealthRecommendation";
import axios from "axios";
import RecommendationCard from "./RecommendationCard";
import Link from "next/link";
import { useInfiniteQuery } from "react-query";
import RecommendationShimmer from "./RecommendationShimmer";
import ErrorCard from "./ErrorCard";
import { useState } from "react";

const RecommendationList = () => {
  const [error, setError] = useState<string | null>(null);

  const {
    isLoading,
    isError,
    status,
    data: recommendations,
  } = useInfiniteQuery({
    queryKey: ["recommendations", { pageSize: 2 }],
    queryFn: async ({ pageParam = 1 }) => {
      return (await axios.get(`/api/coach?page=${pageParam}&pageSize=2`)).data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.data.metadata.hasNextPage) {
        return lastPage.data.metadata.page + 1;
      }
      return undefined;
    },
    onError(err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.message);
      } else {
        setError("Something went wrong");
      }
    },
    staleTime: Infinity,
  });

  if (isError) {
    return (
      <div className="w-full">
        <ErrorCard message={error || "Something went wrong"} />
      </div>
    );
  }

  return (
    <div className="w-full">
      {!isLoading &&
        status === "success" &&
        recommendations?.pages[0].data.data.length > 0 && (
          <h2 className="text-white text-2xl font-bold mb-6">
            Recommendations by Med-o-Coach
          </h2>
        )}
      {isLoading && (
        <div className="flex flex-col gap-4">
          <RecommendationShimmer />
          <RecommendationShimmer />
        </div>
      )}
      {!isLoading &&
        status === "success" &&
        !recommendations?.pages[0].data.data.length && (
          <div className="rounded-2xl w-full p-4 overflow-hidden bg-black border border-white/[0.2] group-hover:border-slate-700 relative z-20">
            <div className="relative z-50">
              <div className="p-4">
                <p className="text-white text-xl">No recommendations found</p>
                <Link href={"/u/coach"}>
                  <button className="mt-4 hover:-translate-y-1 transition duration-150 ease-in-out z-50 relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                    <span className="gap-2 inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                      Let Med-o-Coach help
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      {!isLoading &&
        status === "success" &&
        recommendations?.pages[0].data.data.length > 0 && (
          <>
            <div className="flex flex-col space-y-6">
              {recommendations?.pages[0].data.data.map(
                (recommendation: HealthRecommendation & { _id: string }) => (
                  <Link
                    key={recommendation._id}
                    href={`/u/recommendation/${recommendation._id}`}
                  >
                    <RecommendationCard recommendation={recommendation} />
                  </Link>
                )
              )}
            </div>
            <div className="flex justify-center mt-6">
              <Link href="/u/recommendations">
                <button className="hover:-translate-y-1 transition duration-150 ease-in-out z-50 relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <span className="gap-2 inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                    View all
                  </span>
                </button>
              </Link>
            </div>
          </>
        )}
    </div>
  );
};

export default RecommendationList;
