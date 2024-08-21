import { RxCross2 } from "react-icons/rx";

type Props = {
  imagePreview: string[];
  setImagePreview: (values: string[]) => void;
  images: FileList | undefined | null;
  setImages: (values: FileList | undefined | null) => void;
};

const MessageImagesPreview = ({
  imagePreview,
  setImagePreview,
  images,
  setImages,
}: Props) => {
  const removeImage = (index: number) => {
    const updatedImages = [...imagePreview];
    updatedImages.splice(index, 1);
    setImagePreview(updatedImages);

    const updatedFiles = Array.from(images!).filter(
      (_, i) => i !== index
    ) as unknown as FileList;
    setImages(updatedFiles);
  };
  return (
    <>
      {imagePreview.length > 0 && (
        <div className="flex flex-wrap gap-2 w-full">
          {imagePreview?.map((url, index) => {
            return (
              <div key={index} className="relative">
                <img
                  src={url}
                  alt={`Preview ${index}`}
                  className="w-16 h-16 rounded-md"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-0 right-0 p-1 bg-white rounded-full text-red-500 hover:bg-gray-100"
                >
                  <RxCross2 />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default MessageImagesPreview;
