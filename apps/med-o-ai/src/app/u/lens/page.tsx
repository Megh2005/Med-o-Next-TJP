"use client";

import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { IconUpload } from "@tabler/icons-react";
import axios, { isAxiosError } from "axios";
import { Card, CardTitle } from "@/components/ui/card-hover-effect";
import { PrescriptionContent } from "@/interfaces/Prescription";
import { useQueryClient } from "react-query";
import { toPng } from "html-to-image";

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

const Lens = () => {
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [content, setContent] = useState<PrescriptionContent | null>(null);
  const queryClient = useQueryClient();
  const ref = useRef<HTMLDivElement>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (newFiles: File[]) => {
    setFile(newFiles[0]);
  };

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

  const submitPrescription = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("imgFile", file);

    try {
      setLoading(true);
      const res = await axios.post("/api/lens", formData);

      if (res.data.data.error) {
        setError(res.data.data.errorMessage);
      } else {
        setContent(res.data.data);
        queryClient.invalidateQueries(["prescriptions"]);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.response?.data.data.errorMessage);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <TextGenerateEffect
        duration={0.7}
        className="text-white text-3xl text-center"
        words="Med-o-Lens"
      />
      {!(content || error) && (
        <div className="mt-6">
          <motion.div
            onClick={handleClick}
            whileHover="animate"
            className="group/file block rounded-lg cursor-pointer w-full max-w-xl mx-auto relative overflow-hidden"
          >
            <input
              ref={fileInputRef}
              id="file-upload-handle"
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleFileChange(Array.from(e.target.files || []))
              }
              className="hidden"
            />
            <div className="flex flex-col items-center justify-center">
              <p className="relative z-20 font-sans font-bold text-neutral-300 text-base">
                Upload file
              </p>
              <p className="relative z-20 font-sans font-normal text-neutral-400 text-base mt-2">
                Click to upload
              </p>
              <div className="relative w-full mt-10 max-w-xl mx-auto">
                {file && (
                  <motion.div
                    key={"file"}
                    layoutId={"file-upload"}
                    className="relative overflow-hidden z-40 bg-neutral-900 flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-md shadow-sm"
                  >
                    <div className="flex justify-between w-full items-center gap-4">
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                        className="text-base text-neutral-300 truncate max-w-xs"
                      >
                        {file.name}
                      </motion.p>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                        className="rounded-lg px-2 py-1 w-fit flex-shrink-0 text-sm bg-neutral-800 text-white shadow-input"
                      >
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </motion.p>
                    </div>

                    <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-neutral-400">
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                        className="px-1 py-0.5 rounded-md bg-neutral-800 "
                      >
                        {file.type}
                      </motion.p>

                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                      >
                        modified{" "}
                        {new Date(file.lastModified).toLocaleDateString()}
                      </motion.p>
                    </div>
                  </motion.div>
                )}
                {!file && (
                  <motion.div
                    layoutId="file-upload"
                    variants={mainVariant}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    className="relative group-hover/file:shadow-2xl z-40 bg-neutral-900 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
                  >
                    <IconUpload className="h-4 w-4 text-neutral-300" />
                  </motion.div>
                )}

                {!file && (
                  <motion.div
                    variants={secondaryVariant}
                    className="absolute opacity-0 border border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md"
                  ></motion.div>
                )}
              </div>
            </div>
          </motion.div>
          {file && (
            <div className="my-6 flex justify-center">
              <button
                disabled={loading}
                onClick={submitPrescription}
                className="hover:-translate-y-1 transition duration-150 ease-in-out z-50 relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
              >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="gap-2 inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                  {loading ? "Loading.." : "Read Prescription"}
                </span>
              </button>
            </div>
          )}
        </div>
      )}
      {(error || content) && (
        <div className="my-6">
          {content && (
            <div className="max-w-3xl mx-auto w-full">
              <TextGenerateEffect
                duration={0.9}
                className="text-white text-xl md:text-2xl text-center mb-6"
                words="Prescription Summary"
              />
              <div className="my-6 flex justify-center">
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
              <div ref={ref}>
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
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default Lens;
