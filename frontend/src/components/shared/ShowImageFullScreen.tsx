/* eslint-disable @next/next/no-img-element */
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { RxCross2 } from "react-icons/rx";

type Props = {
  selectedImage: string;
  setSelectedImage: any;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const ShowImageFullScreen = ({
  selectedImage,
  setSelectedImage,
  isOpen,
  setIsOpen,
}: Props) => {
  const closeModal = () => {
    setSelectedImage("");
    setIsOpen(false);
  };

  return (
    <>
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
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center">
            <div className="p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="h-[90vh]  w-[90vw] transform rounded-xl bg-orange-50 dark:bg-gray-600 dark:text-white overflow-hidden lg:p-6 p-3 text-left shadow-xl transition-all relative">
                  <button
                    onClick={closeModal}
                    className="absolute top-1 right-1"
                  >
                    <RxCross2 className="text-2xl" />
                  </button>
                  <img
                    src={selectedImage}
                    alt="Selected Image"
                    className="w-full h-full pr-2 rounded-md object-fill"
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ShowImageFullScreen;
