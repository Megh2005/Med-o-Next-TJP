import React from "react";

const ErrorCard = ({
  message = "Oops! Something went wrong",
}: {
  message?: string;
}) => {
  return (
    <div className="rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-white/[0.2] group-hover:border-slate-700 relative z-20">
      <div className="relative z-50">
        <div className="p-4">
          <p className="text-xl text-white text-center">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorCard;
