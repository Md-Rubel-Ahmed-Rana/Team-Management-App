/* eslint-disable @next/next/no-img-element */
import React, { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IoSend } from "react-icons/io5";
import { useSendMessageMutation } from "@/features/message";
import { useLoggedInUserQuery } from "@/features/user";
import { IUser } from "@/interfaces/user.interface";
import { SocketContext } from "@/context/SocketContext";
import { IMessage } from "@/interfaces/message.interface";
import { acceptableFiles } from "@/constants/acceptableFiles";
import { useRouter } from "next/router";
import MessageFilePreview from "./MessageFilePreview";
import MessageImagesPreview from "./MessageImagesPreview";
import SmallLoader from "@/components/shared/SmallLoader";
import validateFileSize from "@/utils/validateFileSize";
import addNewFileToState from "@/utils/addNewFileToState";
import dynamic from "next/dynamic";
const Dropdown: any = dynamic(() => import("antd/lib/dropdown"), {
  ssr: false,
});
const Button: any = dynamic(() => import("antd/lib/button"), {
  ssr: false,
});
import {
  FaMicrophone,
  FaImage,
  FaVideo,
  FaMusic,
  FaFile,
  FaPlusCircle,
} from "react-icons/fa";
import AudioRecorder from "@/components/shared/AudioRecorder";

type Inputs = {
  poster?: string;
  conversationId?: string;
  type?: string;
  text?: string;
  images?: FileList | string[];
  files?: FileList | string[];
};

const MessageForm = ({ messageType }: { messageType: string }) => {
  const { query } = useRouter();
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
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    formData.append("conversationId", query?.teamId as string);
    formData.append("type", messageType);
    formData.append("text", data?.text || isMessage?.value);

    // reset fields data
    setImagePreview([]);
    setFilePreview([]);
    setImages(null);
    setFiles(null);
    setIsMessage({ status: false, value: "" });
    reset({ text: "" });

    // // Send the formData using your sendMessage function
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
    const newImages = e.target.files;
    if (newImages) {
      let isFileValid = false;
      Array.from(newImages).forEach((file) => {
        const result = validateFileSize(file);
        if (result) {
          isFileValid = true;
        } else {
          isFileValid = false;
        }
      });
      if (isFileValid) {
        if (files) {
          setImages((prev: any) => addNewFileToState(prev, newImages));
        } else {
          setImages(newImages);
        }
        const previewUrls = Array.from(newImages).map((file) =>
          URL.createObjectURL(file)
        );
        setImagePreview((prev) => prev.concat(previewUrls));
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files;
    if (newFiles) {
      let isFileValid = false;
      Array.from(newFiles).forEach((file) => {
        const result = validateFileSize(file);
        if (result) {
          isFileValid = true;
        } else {
          isFileValid = false;
        }
      });
      if (isFileValid) {
        if (files) {
          setFiles((prev: any) => addNewFileToState(prev, newFiles));
        } else {
          setFiles(newFiles);
        }
        const previewUrls = Array.from(newFiles).map((file) => file.name);
        setFilePreview((prev) => prev.concat(previewUrls));
      }
    }
  };

  const items = [
    {
      key: "1",
      label: (
        <label
          htmlFor="images"
          className={`cursor-pointer w-full ${
            isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          <span className="flex items-center gap-2 w-full">
            <FaImage
              className={`text-blue-500 text-lg lg:text-2xl ${
                isLoading ? "cursor-not-allowed" : ""
              }`}
            />
            <small className="font-sans text-lg">Image</small>
          </span>
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
      ),
    },
    {
      key: "2",
      label: (
        <label
          htmlFor="video"
          className={`cursor-pointer w-full ${
            isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          <span className="flex items-center gap-2 w-full  ">
            <FaVideo
              title="File size must be 10MB or less"
              className={`text-blue-500 text-lg lg:text-2xl ${
                isLoading ? "cursor-not-allowed" : ""
              }`}
            />
            <small className="font-sans text-lg">Video</small>
          </span>
          <input
            type="file"
            id="video"
            {...register("files")}
            className="hidden"
            accept={"video/*"}
            onChange={(e) => {
              if (!isLoading) handleFileChange(e);
            }}
            disabled={isLoading}
            multiple
          />
        </label>
      ),
    },
    {
      key: "3",
      label: (
        <label
          htmlFor="audio"
          className={`cursor-pointer w-full ${
            isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          <span className="flex items-center gap-2 w-full ">
            <FaMusic
              title="File size must be 10MB or less"
              className={`text-blue-500 text-lg lg:text-2xl ${
                isLoading ? "cursor-not-allowed" : ""
              }`}
            />
            <small className="font-sans text-lg">Audio</small>
          </span>
          <input
            type="file"
            id="audio"
            {...register("files")}
            className="hidden"
            accept="audio/*"
            onChange={(e) => {
              if (!isLoading) handleFileChange(e);
            }}
            disabled={isLoading}
            multiple
          />
        </label>
      ),
    },
    {
      key: "4",
      label: (
        <label
          htmlFor="document"
          className={`cursor-pointer w-full ${
            isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          <span className="flex items-center gap-2 w-full ">
            <FaFile
              title="File size must be 10MB or less"
              className={`text-blue-500 text-lg lg:text-2xl ${
                isLoading ? "cursor-not-allowed" : ""
              }`}
            />
            <small className="font-sans text-lg">Document</small>
          </span>
          <input
            type="file"
            id="document"
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
      ),
    },
  ];

  return (
    <div className="p-1 lg:p-4 mb-14 lg:mb-0 bg-gray-100 border-t border-gray-300 flex  justify-between items-center relative">
      {/* Image Preview Section */}
      {(imagePreview.length > 0 || filePreview.length > 0) && (
        <div className="flex flex-wrap gap-2 w-[97%] absolute bottom-16 bg-gray-300 p-2 rounded-md">
          <MessageImagesPreview
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
            images={images}
            setImages={setImages}
          />
          <MessageFilePreview
            filePreview={filePreview}
            setFilePreview={setFilePreview}
            files={files}
            setFiles={setFiles}
          />
        </div>
      )}

      <form
        onSubmit={handleSubmit(handleSendMessage)}
        className="flex relative gap-1 lg:gap-2 justify-between items-center w-full"
      >
        <div className="w-2/12 lg:w-1/12 flex items-center gap-2">
          <Dropdown
            menu={{ items }}
            placement="topLeft"
            arrow={{ pointAtCenter: true }}
            className="cursor-pointer "
          >
            <FaPlusCircle className="text-3xl text-blue-600" />
          </Dropdown>
          <AudioRecorder setFiles={setFiles} setFilePreview={setFilePreview} />
        </div>

        <input
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
          className={`border-2 p-2 rounded-md w-full bg-white text-gray-800 focus:outline-none ${
            isLoading
              ? "bg-gray-200 cursor-not-allowed"
              : "border-white-300  focus:border-blue-500"
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
            !isMessage?.value &&
            isLoading
              ? "bg-gray-500 hover:bg-gray-600 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white p-2 lg:px-4 lg:py-2 rounded-full lg:rounded-md w-[40] lg:w-[70px] focus:outline-none flex items-center justify-center`}
        >
          {isLoading ? (
            <SmallLoader />
          ) : (
            <IoSend className="text-lg lg:text-2xl" />
          )}
        </button>
      </form>
    </div>
  );
};

export default MessageForm;
