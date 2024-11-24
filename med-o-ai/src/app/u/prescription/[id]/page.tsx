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
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";

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

  /*  async function handleMint() {
    if(!ref.current) return;
    const dataUrl = await toPng(ref.current, { cacheBust: true });
    console.log("Data URL generated:", dataUrl);
  }  */

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
