import { z } from "zod";

const MAX_FILE_SIZE = 4000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const productSchema = z
  .object({
    name: z.string(),
    genericName: z.string(),
    manufacturer: z.string(),
    description: z.string(),
    category: z.string(),
    dosageForm: z.string(),
    strength: z.string(),
    packSize: z
      .string()
      .transform((val) => parseInt(val, 10))
      .refine((val) => !isNaN(val), {
        message: "packSize must be a valid number",
      }),
    price: z.string(),
    prescriptionRequired: z.boolean().optional(),
    stock: z
      .string()
      .transform((val) => parseInt(val, 10))
      .refine((val) => !isNaN(val), {
        message: "stock must be a valid number",
      }),
    expiryDate: z.date(),
    manufacturedDate: z.date(),
    batchNumber: z.string(),
    activeIngredients: z.string(),
    instructions: z.string(),
    image: z.any(),
  })
  .refine((data) => data.expiryDate >= data.manufacturedDate, {
    message: "Expiry date should be greater than manufactured date",
    path: ["expiryDate"],
  });

export const updateProductSchema = z
  .object({
    name: z.string(),
    genericName: z.string(),
    manufacturer: z.string(),
    description: z.string(),
    category: z.string(),
    dosageForm: z.string(),
    strength: z.string(),
    packSize: z
      .string()
      .transform((val) => parseInt(val, 10))
      .refine((val) => !isNaN(val), {
        message: "packSize must be a valid number",
      }),
    price: z.string(),
    prescriptionRequired: z.boolean().optional(),
    stock: z
      .string()
      .transform((val) => parseInt(val, 10))
      .refine((val) => !isNaN(val), {
        message: "stock must be a valid number",
      }),
    expiryDate: z.date(),
    manufacturedDate: z.date(),
    batchNumber: z.string(),
    activeIngredients: z.string(),
    instructions: z.string(),
    image: z.any().optional(),
  })
  .refine((data) => data.expiryDate >= data.manufacturedDate, {
    message: "Expiry date should be greater than manufactured date",
    path: ["expiryDate"],
  });
