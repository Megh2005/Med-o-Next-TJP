import { Schema } from "mongoose";

export interface Prescription {
  imageUrl: string;
  content: string;
  prescriptionOf: Schema.Types.ObjectId;
}

export interface PrescriptionData {
  _id: string;
  imageUrl: string;
  content: string;
  createdAt: Date;
}

export interface PrescriptionContent {
  title: string;
  error: string;
  errorMessage: string;
  medicines: MedicineDetails[];
}

export interface MedicineDetails {
  name: string;
  details: {
    uses: string;
    safetyAdvice: string;
    sideEffects: string[];
  };
}
