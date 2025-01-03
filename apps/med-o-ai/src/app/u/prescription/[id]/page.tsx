"use client";

import PrescriptionDetailsShimmer from "@/components/PrescriptionDetailsShimmer";
import { Card, CardTitle } from "@/components/ui/card-hover-effect";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import {
  PrescriptionContent,
  PrescriptionData,
} from "@/interfaces/Prescription";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { toPng } from "html-to-image";

const PrescriptionPage = () => {
  const { id } = useParams();
  const [content, setContent] = useState<PrescriptionContent>();
  const ref = useRef<HTMLDivElement>(null);

  const { data, isLoading, status } = useQuery<PrescriptionData>({
    queryKey: ["prescription", id],
    queryFn: async () => {
      const res = await axios.get(`/api/prescription/${id}`);
      return res.data.data as PrescriptionData;
    },
    staleTime: Infinity,
  });

  useEffect(() => {
    if (!data) return;
    setContent(JSON.parse(data.content) as PrescriptionContent);
  }, [data]);

  const downloadPrescription = useCallback(() => {
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
      <div className="my-6 max-w-5xl flex flex-col md:flex-row md:items-start gap-6 mx-auto w-full">
        <PrescriptionDetailsShimmer />
      </div>
    );

  return (
    <div className="my-6 md:my-12 md:pb-6">
      {data && content && status === "success" && (
        <div>
          <TextGenerateEffect
            duration={0.9}
            className="text-white text-xl md:text-2xl text-center mb-6 md:mb-8 "
            words="Prescription Summary"
          />
          <div className="relative max-w-5xl flex flex-col md:flex-row md:items-start gap-6 mx-auto w-full">
            <div className="sticky top-8 left-0 overflow-hidden">
              <Image
                src={data.imageUrl}
                width={400}
                height={400}
                alt="prescription"
                className="rounded-md bg-cover"
              />
              <div className="mt-6 flex justify-center">
                <button
                  onClick={downloadPrescription}
                  className="hover:-translate-y-1 transition duration-150 ease-in-out z-50 relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                >
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <span className="gap-2 inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                    Download Summary
                  </span>
                </button>
              </div>
            </div>
            <div ref={ref} className="space-y-4 bg-black z-20">
              {content.medicines.map((medicine) => (
                <Card key={medicine.name}>
                  <CardTitle>
                    {" "}
                    <TextGenerateEffect
                      duration={0.9}
                      className="text-green-500 text-2xl md:text-3xl"
                      words={medicine.name}
                    />
                  </CardTitle>
                  <div className="mt-6 space-y-4">
                    <div className="space-y-2">
                      <p className="text-neutral-200 text-lg underline underline-offset-4">
                        Uses:
                      </p>
                      <TextGenerateEffect
                        duration={0.9}
                        className="text-white text-base"
                        words={medicine.details.uses}
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="text-neutral-200 text-lg underline underline-offset-4">
                        Side Effects:
                      </p>
                      <ul className="">
                        {medicine.details.sideEffects.map((effect) => (
                          <li
                            className="list-disc text-white ml-6"
                            key={effect}
                          >
                            <TextGenerateEffect
                              duration={0.9}
                              className="text-white text-base"
                              words={effect}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <p className="text-neutral-200 text-lg underline underline-offset-4">
                        Safety Advice:
                      </p>
                      <TextGenerateEffect
                        duration={0.9}
                        className="text-white text-base"
                        words={medicine.details.safetyAdvice}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrescriptionPage;
