/* eslint-disable @next/next/no-img-element */
import React, { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaImage, FaFile } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useSendMessageMutation } from "@/features/message";
import { useLoggedInUserQuery } from "@/features/user";
import { IUser } from "@/interfaces/user.interface";
import { SocketContext } from "@/context/SocketContext";
import { IMessage } from "@/interfaces/message.interface";
import { acceptableFiles } from "@/constants/acceptableFiles";

type Inputs = {
  poster?: string;
  conversationId?: string;
  type?: string;
  text?: string;
  images?: FileList | string[];
  files?: FileList | string[];
  links?: string[];
};

type Props = {
  teamId: string;
  type: string;
};

const MessageForm = ({ teamId, type }: Props) => {
  const { data: userData } = useLoggedInUserQuery({});
  const { socket, setRealTimeMessages }: any = useContext(SocketContext);
  const user: IUser = userData?.data;
  const { register, handleSubmit, reset } = useForm<Inputs>({
    mode: "onChange",
  });
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [filePreview, setFilePreview] = useState<string[]>([]);
  const [images, setImages] = useState<FileList | undefined | null>(null);
  const [files, setFiles] = useState<FileList | undefined | null>(null);
  const [sendMessage, { isLoading }] = useSendMessageMutation();
  const [isMessage, setIsMessage] = useState<any>({ status: false, value: "" });

  const handleSendMessage: SubmitHandler<Inputs> = async (data) => {
    const formData = new FormData();

    // Append files to formData
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        formData.append("files", file);
      });
    }

    // Append images to formData
    if (images && images.length > 0) {
      Array.from(images).forEach((file) => {
        formData.append("images", file);
      });
    }

    // Append other data
    formData.append("poster", user.id);
    formData.append("conversationId", teamId);
    formData.append("type", type);
    formData.append("text", data?.text || isMessage?.value);

    // reset fields data
    setImagePreview([]);
    setFilePreview([]);
    setImages(null);
    setFiles(null);
    setIsMessage({ status: false, value: "" });
    reset({ text: "" });

    // Send the formData using your sendMessage function
    const result: any = await sendMessage(formData);

    if (result?.data?.success) {
      const message = result?.data?.data;
      const poster = {
        _id: user.id,
        name: user.name,
        profile_picture: user.profile_picture,
      };

      const emitData: IMessage = { ...message, poster };
      socket.emit("message", emitData);
      setRealTimeMessages((prev: IMessage[]) => [...prev, emitData]);

      setImagePreview([]);
      setFilePreview([]);
      setImages(null);
      setFiles(null);
      setIsMessage({ status: false, value: "" });
      reset();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setImages(files);
    if (files) {
      const previewUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreview((prev) => prev.concat(previewUrls));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setFiles(files);
    if (files) {
      const previewUrls = Array.from(files).map((file) => file.name);
      setFilePreview((prev) => prev.concat(previewUrls));
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = [...imagePreview];
    updatedImages.splice(index, 1);
    setImagePreview(updatedImages);

    const updatedFiles = Array.from(images!).filter(
      (_, i) => i !== index
    ) as unknown as FileList;
    setImages(updatedFiles);
  };

  const removeFile = (index: number) => {
    const updatedFiles = [...filePreview];
    updatedFiles.splice(index, 1);
    setFilePreview(updatedFiles);

    const updatedFilesList = Array.from(files!).filter(
      (_, i) => i !== index
    ) as unknown as FileList;
    setFiles(updatedFilesList);
  };

  return (
    <div className="mx-auto bg-gray-200 dark:bg-gray-700 shadow-md lg:px-6 p-2 lg:py-2 rounded-md mt-8 mb-40 lg:mb-0">
      {/* Image Preview Section */}
      {imagePreview.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {imagePreview?.map((url, index) => (
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
          ))}
        </div>
      )}

      {/* File Preview Section */}
      {filePreview.length > 0 && (
        <div className="mb-4">
          {filePreview?.map((fileName, index) => (
            <div key={index} className="relative">
              <div className="text-blue-500 hover:underline block mb-2">
                <small>{fileName}</small>
              </div>
              <button
                onClick={() => removeFile(index)}
                className="absolute top-0 right-0 p-1 bg-white rounded-full text-red-500 hover:bg-gray-100"
              >
                <RxCross2 />
              </button>
            </div>
          ))}
        </div>
      )}

      <form
        onSubmit={handleSubmit(handleSendMessage)}
        className="flex  lg:gap-3 gap-2 items-center"
      >
        <label
          htmlFor="images"
          className={`hidden lg:block cursor-pointer ${
            isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          <FaImage
            className={`text-blue-500 hover:underline ${
              isLoading ? "cursor-not-allowed" : ""
            }`}
          />
          <input
            type="file"
            id="images"
            {...register("images")}
            className="hidden"
            accept="image/*"
            multiple
            onChange={(e) => {
              if (!isLoading) handleImageChange(e);
            }}
            disabled={isLoading}
          />
        </label>

        <label
          htmlFor="files"
          className={`hidden lg:block cursor-pointer ${
            isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          <FaFile
            title="File size must be 10MB or less"
            className={`text-blue-500 hover:underline ${
              isLoading ? "cursor-not-allowed" : ""
            }`}
          />
          <input
            type="file"
            id="files"
            {...register("files")}
            className="hidden"
            accept={acceptableFiles}
            onChange={(e) => {
              if (!isLoading) handleFileChange(e);
            }}
            disabled={isLoading}
            multiple
          />
        </label>

        <input
          autoFocus
          type="text"
          readOnly={isLoading}
          {...register("text")}
          name="text"
          placeholder="Type your message..."
          onChange={(e) => {
            if (!isLoading) {
              setIsMessage({
                status: e.target.value ? true : false,
                value: e.target.value,
              });
            }
          }}
          className={`border-2 p-2 rounded-md focus:outline-none flex-grow ${
            isLoading
              ? "bg-gray-200 cursor-not-allowed"
              : "border-gray-300 focus:border-blue-500"
          }`}
        />

        <button
          disabled={
            filePreview.length <= 0 &&
            imagePreview.length <= 0 &&
            !isMessage?.status &&
            isLoading
          }
          type="submit"
          className={`${
            filePreview.length <= 0 &&
            imagePreview.length <= 0 &&
            !isMessage?.status &&
            isLoading
              ? "bg-gray-500 hover:bg-gray-600 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white px-4 py-2 rounded-md focus:outline-none flex items-center justify-center`}
        >
          {isLoading ? (
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
          ) : (
            <IoSend />
          )}
        </button>
      </form>
    </div>
  );
};

export default MessageForm;
