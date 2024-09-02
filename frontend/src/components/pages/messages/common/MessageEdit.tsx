import React, { Fragment, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEditMessageMutation } from "@/features/message";
import toast from "react-hot-toast";
import { SocketContext } from "@/context/SocketContext";
import { useRouter } from "next/router";

type Inputs = {
  message: string;
};

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  messageId: string;
  messageText: string;
};

const MessageEdit = ({ isOpen, setIsOpen, messageId, messageText }: Props) => {
  const { socket }: any = useContext(SocketContext);
  const { query } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onChange",
  });

  const closeModal = () => {
    setIsOpen(false);
  };

  const [editMessage, { isLoading }] = useEditMessageMutation();

  const handleEditMessage: SubmitHandler<Inputs> = async (data: Inputs) => {
    const result: any = await editMessage({
      id: messageId,
      text: data.message,
    });
    if (result?.data?.success) {
      toast.success("Message updated");
      socket.emit("updated-message", {
        receiverId: query?.participant || query?.teamId,
        message: result?.data?.data,
      });
      setIsOpen(false);
    }
    if (result?.error) {
      toast.error("Message was not updated");
      setIsOpen(false);
    }
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
          <div className="fixed inset-0 bg-gray-800 bg-opacity-25" />
        </Transition.Child>

        <div className=" fixed inset-0 flex flex-col items-center justify-center">
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
              <Dialog.Panel className="lg:w-[400px] w-[300px] mx-auto transform rounded-xl bg-orange-50 dark:bg-gray-600 dark:text-white lg:p-6 p-3 text-left  shadow-xl transition-all relative">
                <div className="mt-3">
                  <form onSubmit={handleSubmit(handleEditMessage)}>
                    <h3 className="text-xl font-bold">Edit Message</h3>
                    <div className="relative w-full py-2">
                      <textarea
                        {...register("message", {
                          required: "Message cannot be empty",
                        })}
                        id="message"
                        defaultValue={messageText}
                        className="w-full rounded-lg bg-transparent border border-[#BCBCBC] placeholder:text-sm placeholder:lg:text-base text-sm placeholder:text-[#7B7B7B]  p-2 outline-none   shadow-sm sm:text-sm"
                      />
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    <div className="mt-5 flex justify-between gap-2">
                      <button
                        disabled={isLoading}
                        onClick={closeModal}
                        type="button"
                        className={`w-full rounded-md lg:rounded-full py-1 lg:py-3 ${
                          isLoading
                            ? "opacity-50 cursor-not-allowed bg-gray-400"
                            : ""
                        } dark:text-white mx-auto outline-none border-2 text-sm`}
                      >
                        {isLoading ? "Loading..." : "Cancel"}
                      </button>
                      <button
                        disabled={isLoading}
                        type="submit"
                        className={`border w-full rounded-md lg:rounded-full py-1 lg:py-3 outline-none bg-blue-700 text-white text-md ${
                          isLoading
                            ? "opacity-50 cursor-not-allowed bg-gray-400"
                            : ""
                        }`}
                      >
                        {isLoading ? "Saving..." : "Save changes"}
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default MessageEdit;
