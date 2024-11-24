"use client";

import {
  Card,
  CardDescription,
  CardTitle,
} from "@/components/ui/card-hover-effect";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { HealthRecommendationContent } from "@/interfaces/HealthRecommendation";
import axios from "axios";
import React, { useCallback, useRef, useState } from "react";
import { useQueryClient } from "react-query";
import { toPng } from "html-to-image";

const Coach = () => {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    age: "",
    gender: "male",
    height: "",
    weight: "",
    disease: "",
  });
  const [result, setResult] = useState<HealthRecommendationContent>();
  const queryClient = useQueryClient();
  const ref = useRef<HTMLDivElement>(null);

  const downloadRecommendation = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${result?.title}-${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  const submitData = async () => {
    if (
      userInfo.age === "" ||
      userInfo.gender === "" ||
      userInfo.height === "" ||
      userInfo.weight === "" ||
      userInfo.disease === ""
    )
      return;

    setLoading(true);

    const formData = new FormData();
    formData.append("age", userInfo.age);
    formData.append("gender", userInfo.gender);
    formData.append("height", userInfo.height);
    formData.append("weight", userInfo.weight);
    formData.append("disease", userInfo.disease);

    try {
      const res = await axios.post("/api/coach", formData);

      if (res.data.success) {
        setResult(res.data.data);
        queryClient.invalidateQueries(["recommendations"]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <TextGenerateEffect
        duration={0.7}
        className="text-white text-3xl text-center"
        words="Med-o-Coach"
      />
      {!result && (
        <form className="mt-12 max-w-lg mx-auto w-full space-y-6 flex flex-col items-center">
          <div className="px-6 py-2 w-full max-w-sm rounded-full overflow-hidden bg-zinc-800 text-neutral-300">
            <input
              value={userInfo.age}
              onChange={(e) =>
                setUserInfo((prev) => ({ ...prev, age: e.target.value }))
              }
              className="w-full bg-transparent border-none outline-none"
              type="number"
              min={0}
              max={100}
              placeholder="Your age"
            />
          </div>
          <div className="px-6 py-2 w-full max-w-sm rounded-full overflow-hidden bg-zinc-800 text-neutral-300">
            <select
              value={userInfo.gender}
              className="w-full bg-transparent outline-none border-none"
              name="gender"
              id="gender"
              onChange={(e) =>
                setUserInfo((prev) => ({ ...prev, gender: e.target.value }))
              }
            >
              <option className="text-neutral-300 bg-zinc-800" value="male">
                Male
              </option>
              <option className="text-neutral-300 bg-zinc-800" value="female">
                Female
              </option>
              <option className="text-neutral-300 bg-zinc-800" value="other">
                Other
              </option>
            </select>
          </div>
          <div className="px-6 py-2 w-full max-w-sm rounded-full overflow-hidden bg-zinc-800 text-neutral-300">
            <input
              value={userInfo.disease}
              onChange={(e) =>
                setUserInfo((prev) => ({ ...prev, disease: e.target.value }))
              }
              className="w-full bg-transparent border-none outline-none"
              type="text"
              maxLength={100}
              placeholder="Any disease? If no, please enter 'none'"
            />
          </div>
          <div className="px-6 py-2 w-full max-w-sm rounded-full overflow-hidden bg-zinc-800 text-neutral-300">
            <input
              value={userInfo.height}
              onChange={(e) =>
                setUserInfo((prev) => ({
                  ...prev,
                  height: e.target.value,
                }))
              }
              className="w-full bg-transparent border-none outline-none"
              type="number"
              min={50}
              max={250}
              placeholder="Your Height (in cm)"
            />
          </div>
          <div className="px-6 py-2 w-full max-w-sm rounded-full overflow-hidden bg-zinc-800 text-neutral-300">
            <input
              value={userInfo.weight}
              onChange={(e) =>
                setUserInfo((prev) => ({
                  ...prev,
                  weight: e.target.value,
                }))
              }
              className="w-full bg-transparent border-none outline-none"
              type="number"
              min={1}
              placeholder="Your Weight (in kg)"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              onClick={(e) => {
                e.preventDefault();
                submitData();
              }}
              className="hover:-translate-y-1 transition duration-150 ease-in-out z-50 relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="gap-2 inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                {loading ? "Loading.." : "Submit"}
              </span>
            </button>
          </div>
        </form>
      )}
      {result && (
        <div className="w-full max-w-3xl mx-auto my-6">
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
                {result.title}
              </CardTitle>
              <CardDescription className="text-white text-base">
                {result.introduction}
              </CardDescription>
              <div>
                {result.sections.map((section, index) => (
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
                <p className="text-purple-300 font-bold">* {result.note}</p>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Coach;
