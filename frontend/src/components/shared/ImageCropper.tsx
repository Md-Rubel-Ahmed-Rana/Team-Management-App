import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReactCrop, { centerCrop, makeAspectCrop, Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 180;

type Props = {
  uploadedImage: File;
  croppedImage: File | null;
  setCroppedImage: (value: File) => void;
};

const ImageCropper = ({ uploadedImage, setCroppedImage }: Props) => {
  const [imageSrc, setImageSrc] = useState<string>("");
  const [crop, setCrop] = useState<Crop | undefined>();

  useEffect(() => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageUrl = reader?.result?.toString() || "";
      setImageSrc(imageUrl);
    });
    reader.readAsDataURL(uploadedImage);
  }, [uploadedImage]);

  const onImageLoad = (e: any) => {
    const { width, height, naturalWidth, naturalHeight } = e.currentTarget;

    if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
      toast.error(
        `Image must be at least ${MIN_DIMENSION} x ${MIN_DIMENSION} pixels`
      );
      setImageSrc("");
      return;
    }

    const getCropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: getCropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  const onCropComplete = async (croppedArea: Crop) => {
    if (imageSrc) {
      const canvas = document.createElement("canvas");
      const image = new Image();
      image.src = imageSrc;

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      const ctx = canvas.getContext("2d");

      canvas.width = croppedArea.width;
      canvas.height = croppedArea.height;

      ctx?.drawImage(
        image,
        croppedArea.x * scaleX,
        croppedArea.y * scaleY,
        croppedArea.width * scaleX,
        croppedArea.height * scaleY,
        0,
        0,
        croppedArea.width,
        croppedArea.height
      );

      // Convert canvas to blob
      canvas.toBlob((blob) => {
        if (blob) {
          const croppedFile = new File([blob], "croppedImage.jpg", {
            type: "image/jpeg",
          });
          setCroppedImage(croppedFile);
        }
      }, "image/jpeg");
    }
  };

  return (
    <div>
      {imageSrc && (
        <div>
          <ReactCrop
            crop={crop}
            onChange={(newCrop: Crop) => setCrop(newCrop)}
            onComplete={onCropComplete}
            aspect={ASPECT_RATIO}
            minWidth={MIN_DIMENSION}
          >
            <img src={imageSrc} onLoad={onImageLoad} alt="crop" />
          </ReactCrop>
        </div>
      )}
    </div>
  );
};

export default ImageCropper;
