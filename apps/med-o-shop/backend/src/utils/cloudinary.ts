import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";

cloudinary.config({
  cloud_name: "dutdeodcv",
  api_key: "588452199161783",
  api_secret: "d9xmC81RuqT9zTYGNOWkeCyjKXU", // Click 'View Credentials' below to copy your API secret
});

export async function uploadImageToCloudinary(localFilePath: string) {
  if (!localFilePath) return;
  const response = await cloudinary.uploader.upload(localFilePath, {
    resource_type: "image",
  });

  fs.unlink(localFilePath);

  return response;
}

export async function deleteImageFromCloudinary(
  publicId: string
): Promise<any> {
  if (!publicId) return;

  const response = await cloudinary.uploader.destroy(publicId, {
    resource_type: "image",
  });

  return response;
}
