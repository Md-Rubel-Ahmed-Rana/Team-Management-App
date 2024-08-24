import getCroppedImg from "@/utils/getCroppedImage";
import { resizeImage } from "@/utils/resizeImage";
import { Dialog, Transition } from "@headlessui/react";
import React, { useState, useCallback, Fragment } from "react";
import Cropper from "react-easy-crop";
import toast from "react-hot-toast";
import { FaMinus, FaPlus } from "react-icons/fa";
import { MdOutlineRotateLeft, MdOutlineRotateRight } from "react-icons/md";

type Props = {
  uploadedImage: File;
  setCroppedImage: (value: File) => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const ImageCropperModal = ({
  uploadedImage,
  setCroppedImage,
  isOpen,
  setIsOpen,
}: Props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [image, setImage] = useState<any>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  if (uploadedImage && !image) {
    const reader = new FileReader();
    reader.readAsDataURL(uploadedImage);
    reader.onload = () => {
      setImage(reader.result);
    };
  }

  const onCropComplete = useCallback(
    (croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleZoomChange = (zoomValue: any) => {
    setZoom(zoomValue);
  };

  const handleRotationChange = (rotationValue: any) => {
    setRotation(rotationValue);
  };

  const saveCroppedImage = useCallback(async () => {
    setIsLoading(true);
    try {
      const resizedImage = await resizeImage(image);
      const croppedImg: File = await getCroppedImg(
        resizedImage,
        croppedAreaPixels,
        rotation
      );
      setCroppedImage(croppedImg);
      setIsOpen(false);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(`Image wasn't cropped: ${error?.message}`);
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  }, [image, croppedAreaPixels, rotation]);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full transform transition-all">
                <div className="p-3 lg:p-6">
                  <div className="w-full h-[50vh] relative rounded-lg overflow-hidden bg-gray-100">
                    {image && (
                      <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        rotation={rotation}
                        aspect={1}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                        onRotationChange={setRotation}
                        cropShape="round"
                        style={{
                          containerStyle: {
                            width: "100%",
                            height: "100%",
                          },
                        }}
                      />
                    )}
                  </div>

                  <div className="mt-6 flex flex-col space-y-2">
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() =>
                          handleZoomChange(Math.max(zoom - 0.1, 1))
                        }
                        className="flex items-center justify-center p-2 rounded-full bg-green-500 hover:bg-green-600 text-white"
                      >
                        <FaMinus />
                      </button>
                      <input
                        type="range"
                        className="w-full mx-4 cursor-pointer"
                        min={1}
                        max={10}
                        step={0.1}
                        value={zoom}
                        onChange={(e) => handleZoomChange(e.target.value)}
                      />
                      <button
                        onClick={() =>
                          handleZoomChange(Math.min(zoom + 0.1, 10))
                        }
                        className="flex items-center justify-center p-2 rounded-full bg-green-500 hover:bg-green-600 text-white"
                      >
                        <FaPlus />
                      </button>
                    </div>

                    <div className="flex justify-between items-center">
                      <button
                        onClick={() =>
                          handleRotationChange((rotation - 10 + 360) % 360)
                        }
                        className="flex items-center justify-center p-2 rounded-full bg-purple-500 hover:bg-purple-600 text-white"
                      >
                        <MdOutlineRotateLeft />
                      </button>
                      <input
                        type="range"
                        className="w-full mx-4 cursor-pointer"
                        min={0}
                        max={360}
                        step={1}
                        value={rotation}
                        onChange={(e) => handleRotationChange(e.target.value)}
                      />
                      <button
                        onClick={() =>
                          handleRotationChange((rotation + 10) % 360)
                        }
                        className="flex items-center justify-center p-2 rounded-full bg-purple-500 hover:bg-purple-600 text-white"
                      >
                        <MdOutlineRotateRight />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between gap-3">
                    <button
                      disabled={isLoading}
                      className={`w-full lg:w-auto px-2 lg:px-5 py-2 lg:py-3 rounded-lg  border bg-slate-500 hover:bg-slate-600 ${
                        isLoading ? "cursor-not-allowed" : ""
                      } text-white`}
                      onClick={closeModal}
                    >
                      {isLoading ? "Loading..." : "Don't crop"}
                    </button>
                    <button
                      disabled={isLoading}
                      className={`w-full lg:w-auto px-2 lg:px-10 py-2 lg:py-3 rounded-lg ${
                        isLoading
                          ? "bg-gray-500 hover:bg-gray-600 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                      } text-white`}
                      onClick={saveCroppedImage}
                    >
                      {isLoading ? "Saving cropped..." : "Save"}
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ImageCropperModal;
