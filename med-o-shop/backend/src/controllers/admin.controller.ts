import { Request, Response } from "express";
import { productSchema } from "../lib/schemas/product.schema";
import ApiResponse from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { ProductModel } from "../models/product.model";
import {
  deleteImageFromCloudinary,
  uploadImageToCloudinary,
} from "../utils/cloudinary";
import { getCloudinaryPublicId } from "../utils/getCloudinaryId";
import { PAGINATION_OFFSET } from "../utils/constants";
import { CustomRequest } from "../lib/interfaces/CustomRequest";

export const addProduct = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    if (!req.isAdmin) {
      return res.status(401).json(new ApiResponse(401, "Unauthorized", null));
    }

    const imageFilePath = req.file?.path;
    const formData = req.body;

    if (!imageFilePath) {
      return res
        .status(400)
        .json(new ApiResponse(400, "Image is required", null));
    }

    const medicineInfo = {
      name: formData.name,
      genericName: formData.genericName,
      manufacturer: formData.manufacturer,
      description: formData.description,
      category: formData.category,
      dosageForm: formData.dosageForm,
      strength: formData.strength,
      packSize: formData.packSize,
      price: formData.price,
      prescriptionRequired: Boolean(formData.prescriptionRequired),
      stock: formData.stock,
      expiryDate: new Date(formData.expiryDate),
      manufacturedDate: new Date(formData.manufacturedDate),
      batchNumber: formData.batchNumber,
      activeIngredients: formData.activeIngredients,
      instructions: formData.instructions,
    };

    const { success } = productSchema.safeParse(medicineInfo);

    if (!success) {
      return res
        .status(400)
        .json(new ApiResponse(400, "Invalid request body", null));
    }

    // check expiry date

    if (medicineInfo.expiryDate! <= medicineInfo.manufacturedDate!) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            "Expiry date should be greater than manufactured date",
            null
          )
        );
    }

    // upload image to cloudinary
    const uploadResult = await uploadImageToCloudinary(imageFilePath);

    if (!uploadResult) {
      return res
        .status(500)
        .json(
          new ApiResponse(500, "Error uploading image to cloudinary", null)
        );
    }

    // save medicine to database
    const savedMedicine = await ProductModel.create({
      ...medicineInfo,
      imageUrl: uploadResult.secure_url,
    });

    if (!savedMedicine) {
      return res
        .status(500)
        .json(new ApiResponse(500, "Error saving medicine to database", null));
    }

    return res
      .status(201)
      .json(new ApiResponse(201, "Medicine added successfully", savedMedicine));
  }
);

export const updateProduct = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    if (!req.isAdmin) {
      return res.status(401).json(new ApiResponse(401, "Unauthorized", null));
    }

    const url = req.url;
    const medicineId = url.split("/").pop();

    const imageFilePath = req.file?.path;
    const formData = req.body;

    const medicineInfo = {
      name: formData.name,
      genericName: formData.genericName,
      manufacturer: formData.manufacturer,
      description: formData.description,
      category: formData.category,
      dosageForm: formData.dosageForm,
      strength: formData.strength,
      packSize: formData.packSize,
      price: formData.price,
      prescriptionRequired: Boolean(formData.prescriptionRequired),
      stock: formData.stock,
      expiryDate: new Date(formData.expiryDate),
      manufacturedDate: new Date(formData.manufacturedDate),
      batchNumber: formData.batchNumber,
      activeIngredients: formData.activeIngredients,
      instructions: formData.instructions,
    };

    const { success } = productSchema.safeParse(medicineInfo);

    if (!success) {
      return res
        .status(400)
        .json(new ApiResponse(400, "Invalid request body", null));
    }

    const medicine = await ProductModel.findById(medicineId);

    if (!medicine) {
      return res.json(new ApiResponse(400, "Medicine not found", null));
    }

    if (imageFilePath) {
      const response = await uploadImageToCloudinary(imageFilePath);

      if (!response) {
        return res.json(new ApiResponse(400, "Failed to upload image", null));
      }
      // delete old image from cloudinary
      const deletedImage = await deleteImageFromCloudinary(
        getCloudinaryPublicId(medicine.imageUrl)
      );
      if (!deletedImage) {
        return res.json(
          new ApiResponse(400, "Failed to delete old image", null)
        );
      }
      medicine.imageUrl = response.secure_url;
    }

    medicine.name = medicineInfo.name;
    medicine.genericName = medicineInfo.genericName;
    medicine.manufacturer = medicineInfo.manufacturer;
    medicine.description = medicineInfo.description;
    medicine.category = medicineInfo.category;
    medicine.dosageForm = medicineInfo.dosageForm;
    medicine.strength = medicineInfo.strength;
    medicine.packSize = parseInt(medicineInfo.packSize);
    medicine.price = medicineInfo.price;
    medicine.prescriptionRequired = medicineInfo.prescriptionRequired;
    medicine.stock = parseInt(medicineInfo.stock);
    medicine.expiryDate = medicineInfo.expiryDate;
    medicine.manufacturedDate = medicineInfo.manufacturedDate;
    medicine.batchNumber = medicineInfo.batchNumber;
    medicine.activeIngredients = medicineInfo.activeIngredients;
    medicine.instructions = medicineInfo.instructions;

    const updatedMedicine = await medicine.save();

    if (!updatedMedicine) {
      return res.json(new ApiResponse(400, "Failed to update medicine", null));
    }

    return res
      .status(201)
      .json(
        new ApiResponse(201, "Medicine updated successfully", updatedMedicine)
      );
  }
);

export const deleteProduct = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    if (!req.isAdmin) {
      return res.status(401).json(new ApiResponse(401, "Unauthorized", null));
    }

    const url = req.url;
    const medicineId = url.split("/").pop();

    if (!medicineId) {
      return res
        .status(400)
        .json(new ApiResponse(400, "Medicine ID is required", null));
    }

    const deletedMedicine = await ProductModel.findByIdAndDelete(medicineId);

    if (!deletedMedicine) {
      return res
        .status(400)
        .json(new ApiResponse(400, "Error deleting medicine", null));
    }

    return res.status(200).json(new ApiResponse(200, "Medicine deleted", null));
  }
);

export const getProducts = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    if (!req.isAdmin) {
      return res.status(401).json(new ApiResponse(401, "Unauthorized", null));
    }

    const query = req.query;
    const searchQuery = query.q as string;
    const sortBy = (query.sortBy as string) || "createdAt";
    const page = parseInt((query.page as string) || "1");
    const pageSize = parseInt(
      (query.pageSize as string) || `${PAGINATION_OFFSET}`
    );

    const medicines = await ProductModel.aggregate([
      {
        $match: {
          $or: [
            { name: { $regex: searchQuery, $options: "i" } },
            { manufacturer: { $regex: searchQuery, $options: "i" } },
          ],
        },
      },
      {
        $sort: { [sortBy]: sortBy === "createdAt" ? -1 : 1 },
      },
      {
        $facet: {
          metadata: [{ $count: "totalCount" }],
          data: [{ $skip: (page - 1) * pageSize }, { $limit: pageSize }],
        },
      },
      {
        $project: {
          data: 1,
          totalCount: {
            $ifNull: [{ $arrayElemAt: ["$metadata.totalCount", 0] }, 0],
          },
        },
      },
    ]);

    const response = {
      data: medicines[0].data,
      metadata: {
        totalCount: medicines[0].totalCount,
        page,
        pageSize,
        hasNextPage: medicines[0].totalCount - page * pageSize > 0,
      },
    };

    return res
      .status(200)
      .json(new ApiResponse(200, "Medicines fetched successfully", response));
  }
);

export const getProductDetails = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    if (!req.isAdmin) {
      return res.status(401).json(new ApiResponse(401, "Unauthorized", null));
    }

    const url = req.url;
    const medicineId = url.split("/").pop();

    const medicineDetails = await ProductModel.findById(medicineId);

    if (!medicineDetails) {
      return res
        .status(404)
        .json(new ApiResponse(404, "Medicine Details not found", null));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "Medicine Details found", medicineDetails));
  }
);
