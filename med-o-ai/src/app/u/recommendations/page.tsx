"use client";

import ErrorCard from "@/components/ErrorCard";
import RecommendationCard from "@/components/RecommendationCard";
import RecommendationShimmer from "@/components/RecommendationShimmer";
import { HealthRecommendation } from "@/interfaces/HealthRecommendation";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useInfiniteQuery } from "react-query";

const AllRecommendations = () => {
  const [error, setError] = useState<string | null>(null);
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    status,
    data: recommendations,
  } = useInfiniteQuery({
    queryKey: ["recommendations", { pageSize: 10 }],
    queryFn: async ({ pageParam = 1 }) => {
      return (await axios.get(`/api/coach?page=${pageParam}`)).data;
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
      <div className="w-full max-w-xl mx-auto">
        <ErrorCard message={error || "Something went wrong"} />
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto pb-10 md:pb-20">
      <h2 className="text-white text-2xl font-bold mb-6">
        All Recommendations
      </h2>
      {isLoading && (
        <div className="flex flex-col gap-4">
          <RecommendationShimmer />
          <RecommendationShimmer />
        </div>
      )}
      {!isLoading && status === "success" && (
        <>
          <div className="flex flex-col space-y-6">
            {recommendations?.pages.map((page) => {
              return page.data.data.map(
                (recommendation: HealthRecommendation & { _id: string }) => {
                  return (
                    <Link
                      key={recommendation._id}
                      href={`/u/recommendation/${recommendation._id}`}
                    >
                      <RecommendationCard recommendation={recommendation} />
                    </Link>
                  );
                }
              );
            })}
          </div>
          {isFetchingNextPage && (
            <div className="flex flex-col gap-4 mt-4">
              <RecommendationShimmer />
            </div>
          )}
          {hasNextPage && !isFetchingNextPage && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => fetchNextPage()}
                className="hover:-translate-y-1 transition duration-150 ease-in-out z-50 relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
              >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="gap-2 inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                  Load More
                </span>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllRecommendations;
