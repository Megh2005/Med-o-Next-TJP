export const getCloudinaryPublicId = (url: string): string => {
  return "med-o-next/product_images/" + url.split("/").pop()?.split(".")[0]!;
};
