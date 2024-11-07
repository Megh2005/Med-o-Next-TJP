"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import TextShimmer from "./TextShimmer";
import ImageShimmer from "./ImageShimmer";

const HomeTopbar = () => {
  const { data } = useSession();

  if (!data?.user)
    return (
      <div className="mb-6">
        <div className="w-full max-w-xs flex items-center gap-4">
          <div className="">
            <ImageShimmer />
          </div>
          <div className="flex-1">
            <TextShimmer />
          </div>
        </div>
      </div>
    );

  return (
    <div className="mb-6 flex items-center justify-start gap-4">
      <div className="z-50 overflow-hidden rounded-full border border-neutral-300">
        <Image
          className="w-7 h-7 md:w-8 md:h-8"
          src={data.user.image!}
          width={32}
          height={32}
          alt="avatar"
        />
      </div>
      <TextGenerateEffect
        words={`Welcome back, ${data.user.name}`}
        className="text-lg md:text-2xl text-white font-medium"
        duration={0.8}
      />
    </div>
  );
};

export default HomeTopbar;
