import ShowImageFullScreen from "@/components/shared/ShowImageFullScreen";
import { useState } from "react";

type Props = {
  images: string[];
};

const MessageImages = ({ images }: Props) => {
  const [imageModalOpen, setImageModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const handleShowImageFullScreen = (image: string) => {
    setSelectedImage(image);
    setImageModalOpen(true);
  };
  return (
    <div className="my-4 flex flex-wrap gap-4">
      {images?.map((image: string, imageIndex: number) => (
        <img
          onClick={() => handleShowImageFullScreen(image)}
          key={imageIndex}
          src={image}
          alt={"message image"}
          className="w-28 h-28 rounded-md cursor-pointer border-2"
        />
      ))}
      {/* image showing full screen modal  */}
      {imageModalOpen && selectedImage && (
        <ShowImageFullScreen
          image={selectedImage}
          setSelectedImage={setSelectedImage}
          setImageModalOpen={setImageModalOpen}
        />
      )}
    </div>
  );
};

export default MessageImages;
