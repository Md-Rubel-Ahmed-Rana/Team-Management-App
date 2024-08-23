import { createImage, getRadianAngle } from "./createImage";

export const getCroppedImg = async (
  imageSrc: any,
  pixelCrop: any,
  rotation = 0
): Promise<File> => {
  const image: any = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx: any = canvas.getContext("2d");

  const safeArea = Math.max(image.width, image.height) * 2;

  // Ensure the canvas is large enough to include the whole rotated image
  canvas.width = safeArea;
  canvas.height = safeArea;

  // Translate the canvas context to the center of the canvas
  ctx.translate(safeArea / 2, safeArea / 2);
  ctx.rotate(getRadianAngle(rotation));
  ctx.translate(-safeArea / 2, -safeArea / 2);

  // Draw the image onto the rotated context
  ctx.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5
  );

  const data = ctx.getImageData(0, 0, safeArea, safeArea);

  // Set canvas width to the final desired crop size
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // Draw the rotated image onto the new canvas
  ctx.putImageData(
    data,
    Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
    Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob: any) => {
      if (!blob) {
        reject(new Error("Canvas is empty"));
        return;
      }
      blob.name = "cropped.jpg";
      resolve(blob);
    }, "image/jpeg");
  });
};

export default getCroppedImg;
