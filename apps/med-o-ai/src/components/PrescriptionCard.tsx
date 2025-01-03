import { PrescriptionData } from "@/interfaces/Prescription";
import React from "react";
import { Card } from "./ui/card-hover-effect";
import Image from "next/image";

const PrescriptionCard = ({
  prescription,
}: {
  prescription: PrescriptionData;
}) => {
  const prescriptionContent = JSON.parse(prescription.content);

  return (
    <Card>
      <div className="flex items-start gap-4">
        <div className="w-20 h-full rounded-sm overflow-hidden">
          <Image
            src={prescription.imageUrl}
            width={100}
            height={100}
            alt="prescription"
            className="bg-cover"
          />
        </div>
        <div>
          <p className="text-white text-base">{prescriptionContent.title}</p>
          <p className="text-neutral-400 text-sm">
            Generated on{" "}
            {new Date(prescription.createdAt).toLocaleDateString().toString()}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default PrescriptionCard;
