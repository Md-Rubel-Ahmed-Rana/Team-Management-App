import { createImage } from "./createImage";

export const resizeImage = async (
  imageSrc: string,
  maxWidth: number = 1920,
  maxHeight: number = 1080
): Promise<string> => {
  const img: any = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
  const width = img.width * ratio;
  const height = img.height * ratio;

  canvas.width = width;
  canvas.height = height;

  ctx.drawImage(img, 0, 0, width, height);

  return canvas.toDataURL("image/jpeg");
};
