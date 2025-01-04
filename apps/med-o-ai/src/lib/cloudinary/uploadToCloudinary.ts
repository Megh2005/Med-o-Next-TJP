import cloudinary from "@/lib/cloudinary/config";

export const uploadToCloudinary = async (
  fileUri: string,
  folderName: string
) => {
  const res = await cloudinary.uploader.upload(fileUri, {
    invalidate: true,
    resource_type: "image",
    folder: "med-o-ai/" + folderName,
  });

  return res;
};
