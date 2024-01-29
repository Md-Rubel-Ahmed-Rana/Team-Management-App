/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaLink, FaImage, FaFile } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import LinkModal from "./LinkModal";
import useUploadMultipleImage from "@/hooks/useUploadMultipleImage";
import useUploadMultipleFile from "@/hooks/useUploadMultipleFiles";
import { useSendMessageMutation } from "@/features/message";
import { useLoggedInUserQuery } from "@/features/user";
import { IUser } from "@/interfaces/user.interface";
import { SocketContext } from "@/context/SocketContext";
import { IMessage } from "@/interfaces/message.interface";

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
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [links, setLinks] = useState<string[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [filesUrls, setFileUrls] = useState<string[]>([]);
  const uploadImages = useUploadMultipleImage();
  const uploadFiles = useUploadMultipleFile();
  const [sendMessage] = useSendMessageMutation();
  const [isMessage, setIsMessage] = useState(false);

  const openLinkModal = () => {
    setShowLinkModal(true);
  };

  const closeLinkModal = () => {
    setShowLinkModal(false);
  };

  const handleLinkModalSubmit = (link: string) => {
    setLinks((prev: string[]) => [...prev, link]);
  };

  const handleSendMessage: SubmitHandler<Inputs> = async (data) => {
    if (files && files?.length > 0) {
      await uploadFiles(files, setFileUrls);
    }
    if (images && images.length > 0) {
      await uploadImages(images, setImageUrls);
    }
    data.files = filesUrls!;
    data.images = imageUrls!;
    data.links = links;
    data.poster = user._id;
    data.conversationId = teamId;
    data.type = type;
    const result: any = await sendMessage(data);
    if (result?.data?.success) {
      const message = result?.data?.data;
      const poster = {
        _id: user._id,
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
      setShowLinkModal(false);
      setLinks([]);
      setImageUrls([]);
      setFileUrls([]);
      setIsMessage(false);
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

  const removeLink = (link: string) => {
    const remainingLinks = links.filter((lk) => lk !== link);
    setLinks(remainingLinks);
  };

  return (
    <div className="mx-auto bg-gray-200 shadow-md px-6 py-2 rounded-md mt-8">
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

      {/* links Preview Section */}
      {links.length > 0 && (
        <div className="mb-4">
          {links?.map((link, index) => (
            <div key={index} className="relative">
              <div className="text-blue-500 hover:underline block mb-2">
                <small>{link}</small>
              </div>
              <button
                onClick={() => removeLink(link)}
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
        className="flex flex-wrap gap-3 items-center"
      >
        <label className="mr-2 cursor-pointer" onClick={openLinkModal}>
          <FaLink className="text-blue-500 hover:underline" />
          <input type="text" {...register("links")} className="hidden" />
        </label>

        <label htmlFor="images" className="mr-2 cursor-pointer">
          <FaImage className="text-blue-500 hover:underline" />
          <input
            type="file"
            id="images"
            {...register("images")}
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
        </label>

        <label htmlFor="files" className="mr-2 cursor-pointer">
          <FaFile
            title="Only pdf and video file supported"
            className="text-blue-500 hover:underline"
          />
          <input
            type="file"
            id="files"
            {...register("files")}
            className="hidden"
            accept="application/pdf, pdf,mp4,avi,mov,mkv,wmv,flv,mpeg,mpg,webm,3gp"
            onChange={handleFileChange}
            multiple
          />
        </label>

        <input
          type="text"
          {...register("text")}
          placeholder="Type your message..."
          onChange={(e) => setIsMessage(e.target.value ? true : false)}
          className="border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500 flex-grow"
        />

        <button
          disabled={
            links.length <= 0 &&
            filePreview.length <= 0 &&
            imagePreview.length <= 0 &&
            !isMessage
          }
          type="submit"
          className={`${
            links.length <= 0 &&
            filePreview.length <= 0 &&
            imagePreview.length <= 0 &&
            !isMessage
              ? "bg-gray-500 hover:bg-gray-600"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white px-4 py-2 rounded-md  focus:outline-none`}
        >
          <IoSend />
        </button>
      </form>
      {/* Link Modal */}
      {showLinkModal && (
        <LinkModal
          isOpen={showLinkModal}
          onClose={closeLinkModal}
          onSubmit={handleLinkModalSubmit}
        />
      )}
    </div>
  );
};

export default MessageForm;
