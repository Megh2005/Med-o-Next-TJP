"use client";

import { BackgroundBeams } from "@/components/ui/background-beams";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { FlipWords } from "@/components/ui/flip-words";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const words = ["Health Coach", "Prescription Assistant"];

  return (
    <div className="min-h-screen w-full rounded-md bg-neutral-950 relative flex flex-col items-center antialiased">
      <main className="max-w-3xl mx-auto p-4 mt-20">
        <TextGenerateEffect
          duration={0.3}
          className="text-white text-3xl md:text-4xl lg:text-6xl text-center"
          words="Med-o-AI"
        />
        <div className="mt-4 md:mt-2 text-lg md:text-2xl lg:text-4xl mx-auto font-normal text-neutral-400 text-center">
          Your AI <br />
          <FlipWords className="text-inherit text-white" words={words} />
        </div>
        <div className="my-8 flex justify-center">
          <button
            onClick={() => signIn("google", { callbackUrl: "/u/home" })}
            className="hover:-translate-y-1 transition duration-150 ease-in-out z-50 relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="gap-2 inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              <Image alt="Google" src={"/google.png"} width={20} height={20} />
              Continue With Google
            </span>
          </button>
        </div>
      </main>
      <section className="my-4 md:my-8 w-full">
        <h2 className="text-xl md:text-2xl text-white text-center font-bold">
          What is{" "}
          <span className="bg-opacity-70 bg-gradient-to-r from-blue-500 to-pink-500 text-white rounded-md p-1">
            Med-o-AI?
          </span>
        </h2>
        <div className="max-w-3xl mx-auto text-center my-4 px-4">
          <p className="text-balance text-neutral-300 text-sm sm:text-base ">
            With Med-o-AI, experience a seamless blend of proactive health
            coaching and precise prescription insights—all in one place for a
            healthier, more informed you.Unlock the power of personalized
            wellness with Med-o-Coach, offering tailored health recommendations
            based on your unique data, and Med-o-Lens, that effortlessly reads
            handwritten medical prescriptions.
          </p>
        </div>
        <div className="max-w-5xl mx-auto px-8">
          <HoverEffect
            className="grid grid-cols-1 md:grid-cols-2"
            items={[
              {
                description:
                  "Easily read handwritten prescriptions with AI-powered accuracy, providing clear and reliable insights into your prescribed medications for safer, informed care",
                title: "Med-o-Lens",
                link: "/lens",
              },
              {
                description:
                  " Get personalized health and wellness recommendations tailored to your unique data, empowering you to achieve better health goals with insights that fit your lifestyle",
                title: "Med-o-Coach",
                link: "/coach",
              },
            ]}
          />
        </div>
      </section>
      <footer className="px-4 py-6">
        <p className="text-white text-sm">Copyright © 2024 Med-o-AI</p>
      </footer>
      <BackgroundBeams />
    </div>
  );
}
