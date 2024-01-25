/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaLink, FaImage, FaFile } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import LinkModal from "./LinkModal";

type Inputs = {
  text?: string;
  images?: FileList;
  files?: FileList;
  links?: string[];
};

const MessageForm = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [filePreview, setFilePreview] = useState<string[]>([]);
  const [images, setImages] = useState<FileList | undefined | null>();
  const [files, setFiles] = useState<FileList | undefined | null>();
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [links, setLinks] = useState<string[]>([]);

  const openLinkModal = () => {
    setShowLinkModal(true);
  };

  const closeLinkModal = () => {
    setShowLinkModal(false);
  };

  const handleLinkModalSubmit = (link: string) => {
    setLinks((prev: string[]) => [...prev, link]);
    console.log("Link submitted:", link);
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    data.files = files!;
    data.images = images!;
    data.links = links;
    console.log(data);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setImages(files);
    if (files) {
      const previewUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreview(previewUrls);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setFiles(files);
    if (files) {
      const previewUrls = Array.from(files).map((file) => file.name);
      setFilePreview(previewUrls);
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
        onSubmit={handleSubmit(onSubmit)}
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
          <FaFile className="text-blue-500 hover:underline" />
          <input
            type="file"
            id="files"
            {...register("files")}
            className="hidden"
            accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, text/plain, application/zip, application/x-zip-compressed"
            onChange={handleFileChange}
            multiple
          />
        </label>

        <input
          type="text"
          {...register("text")}
          placeholder="Type your message..."
          className="border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500 flex-grow"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
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
