/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";

type Props = {
  image: string;
  setSelectedImage: any;
  setImageModalOpen: any;
};

const ShowImageFullScreen = ({
  image,
  setSelectedImage,
  setImageModalOpen,
}: Props) => {
  const closeModal = () => {
    setSelectedImage("");
    setImageModalOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-75 flex items-center justify-center">
      <div className="bg-white overflow-auto p-20">
        <img
          src={image}
          alt="Selected Image"
          className="w-9/12 h-9/12 rounded-md"
        />
        <button
          className="absolute top-10 right-10 text-white bg-blue-600 px-4 py-2 rounded-md"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ShowImageFullScreen;
