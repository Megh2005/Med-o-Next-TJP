import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import { PAGINATION_OFFSET } from "../utils/constants";
import ApiResponse from "../utils/ApiResponse";
import { ProductModel } from "../models/product.model";

type SortOrder = -1 | 1;

export const search = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query;
  const searchQuery = query.q;
  const inStock = Boolean(query.inStock as string) || false;
  const dosageForm = (query.dosageForm as string) || "";
  const category = (query.category as string) || "";
  const sortBy = (query.sortBy as string) || "price";
  const sortOrder = (parseInt(query.sortOrder as string) as SortOrder) || 1;
  const page = parseInt((query.page as string) || "1");
  const pageSize = parseInt(
    (query.pageSize as string) || `${PAGINATION_OFFSET}`
  );

  if (!searchQuery) {
    return res
      .status(400)
      .json(new ApiResponse(400, "Search Query is required", null));
  }

  const sort: Record<string, -1 | 1> = {};
  if (sortBy === "price") {
    sort["convertedPrice"] = sortOrder;
  } else {
    sort[sortBy] = sortOrder;
  }

  const products = await ProductModel.aggregate([
    {
      $match: {
        $and: [
          inStock ? { stock: { $gt: 0 } } : {},
          { dosageForm: { $regex: dosageForm, $options: "i" } },
          { category: { $regex: category, $options: "i" } },
          {
            $or: [
              { name: { $regex: searchQuery, $options: "i" } },
              { genericName: { $regex: searchQuery, $options: "i" } },
            ],
          },
        ],
      },
    },
    {
      $addFields: {
        convertedPrice: { $toDouble: "$price" },
      },
    },
    {
      $facet: {
        metadata: [{ $count: "totalCount" }],
        data: [
          {
            $sort: sort,
          },
          { $skip: (page - 1) * pageSize },
          { $limit: pageSize },
        ],
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
    data: products[0].data,
    metadata: {
      totalCount: products[0].totalCount,
      page,
      pageSize,
      hasNextPage: products[0].totalCount - page * pageSize > 0,
    },
  };

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Search results fetched successfully", response)
    );
});
