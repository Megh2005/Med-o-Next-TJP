import React from "react";

const RecommendationShimmer = () => {
  return (
    <div className="rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-white/[0.2] group-hover:border-slate-700 relative z-20">
      <div className="relative z-50">
        <div className="p-4">
          <div className="animate-pulse space-y-8">
            <div className="h-4 bg-gray-500 rounded-md w-3/4"></div>

            <div className="space-y-2">
              <div className="h-3 bg-gray-500 rounded-md w-full"></div>
              <div className="h-3 bg-gray-500 rounded-md w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationShimmer;
