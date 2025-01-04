"use client";

import PrescriptionCard from "@/components/PrescriptionCard";
import { PrescriptionData } from "@/interfaces/Prescription";
import axios from "axios";
import Link from "next/link";
import { useInfiniteQuery } from "react-query";
import PrescriptionShimmer from "./PrescriptionShimmer";
import { useState } from "react";
import ErrorCard from "./ErrorCard";

const PrescriptionsList = () => {
  const [error, setError] = useState<string | null>(null);

  const {
    isLoading,
    isError,
    status,
    data: prescriptions,
  } = useInfiniteQuery({
    queryKey: ["prescriptions", { pageSize: 3 }],
    queryFn: async ({ pageParam = 1 }) => {
      return (await axios.get(`/api/lens?page=${pageParam}&pageSize=3`)).data;
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
      <div>
        <ErrorCard message={error || "Something went wrong"} />
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg">
      {!isLoading &&
        status === "success" &&
        prescriptions?.pages[0].data.data.length > 0 && (
          <h2 className="text-white text-2xl font-bold mb-6">
            Your Prescriptions
          </h2>
        )}

      {isLoading && (
        <div>
          <div className="flex flex-col space-y-6">
            <PrescriptionShimmer />
            <PrescriptionShimmer />
            <PrescriptionShimmer />
          </div>
        </div>
      )}

      {!isLoading &&
        status === "success" &&
        !prescriptions?.pages[0].data.data.length && (
          <div className="rounded-2xl w-full p-4 overflow-hidden bg-black border border-white/[0.2] group-hover:border-slate-700 relative z-20">
            <div className="relative z-50">
              <div className="p-4">
                <p className="text-white text-xl">
                  Looks like you haven&apos;t read any prescriptions yet
                </p>
                <Link href={"/u/lens"}>
                  <button className="mt-4 hover:-translate-y-1 transition duration-150 ease-in-out z-50 relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                    <span className="gap-2 inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                      Read a Prescription
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}

      {!isLoading &&
        status === "success" &&
        prescriptions?.pages[0].data.data.length > 0 && (
          <>
            <div className="flex flex-col space-y-6">
              {prescriptions?.pages[0].data.data.map(
                (prescription: PrescriptionData) => (
                  <Link
                    href={`/u/prescription/${prescription._id}`}
                    key={prescription._id}
                  >
                    <PrescriptionCard prescription={prescription} />
                  </Link>
                )
              )}
            </div>
            <div className="flex justify-center mt-6">
              <Link href={"/u/prescriptions"}>
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

export default PrescriptionsList;
