/* eslint-disable @next/next/no-img-element */
import ShowImageFullScreen from "@/components/shared/ShowImageFullScreen";
import {
  useDeleteMessageMutation,
  useEditMessageMutation,
} from "@/features/message";
import { useLoggedInUserQuery } from "@/features/user";
import { IUser } from "@/interfaces/user.interface";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaRegTrashAlt, FaPencilAlt } from "react-icons/fa";

interface Poster {
  _id?: string;
  name: string;
  profile_picture: string;
}

export interface Post {
  poster: Poster;
  _id?: string;
  text: string;
  images: string[];
  files: string[];
  links: string[];
}

interface Props {
  messages: Post[];
}

const ShowMessages = ({ messages }: Props) => {
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const [isEdit, setIsEdit] = useState({ index: 0, status: false });
  const [editedMessage, setEditedMessage] = useState<string | undefined>("");
  const [imageModalOpen, setImageModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [isEditMessage, setIsEditMessage] = useState<{
    id: string | undefined;
    status: boolean;
  }>({
    id: "",
    status: false,
  });
  const { data: userData } = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const [deleteMessage] = useDeleteMessageMutation();
  const [editMessage] = useEditMessageMutation();

  const handleShowImageFullScreen = (image: string) => {
    console.log("Clicked on image", image);
    setSelectedImage(image);
    setImageModalOpen(true);
  };

  const handleDeleteMessage = async (id: string | undefined) => {
    const result: any = await deleteMessage(id);
    if (result?.data?.success) {
      toast.success("Message deleted");
    }
    if (result?.error) {
      toast.error("Message was not deleted");
    }
  };

  const handleEditMessage = async () => {
    const result: any = await editMessage({
      id: isEditMessage.id,
      text: editedMessage,
    });
    if (result?.data?.success) {
      toast.success("Message updated");
    }
    if (result?.error) {
      toast.error("Message was not updated");
    }
  };

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={messagesContainerRef}
      className="mx-auto mt-8 h-60  overflow-hidden hover:overflow-auto  scrollbar scrollbar-w-[4px] scrollbar-thumb-blue-600 scrollbar-thin-rounded-md scrollbar-track-slate-100"
    >
      {messages?.map((post, index) => (
        <div
          key={index}
          className="mx-auto bg-white shadow-lg rounded-md p-6 mb-8"
          onMouseOver={() => setIsEdit({ index: index, status: true })}
          onMouseLeave={() => setIsEdit({ index: 0, status: false })}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center mb-4">
              <img
                src={post?.poster?.profile_picture}
                alt={post?.poster?.name}
                className="w-10 h-10 rounded-full mr-4"
              />
              <span className="font-bold">{post?.poster?.name}</span>
            </div>
            {isEdit.status &&
              isEdit.index === index &&
              user._id === post?.poster?._id && (
                <div className="flex items-center gap-3 mb-4">
                  <button
                    title="Edit Message"
                    onClick={() =>
                      setIsEditMessage({ id: post?._id, status: true })
                    }
                    className="bg-gray-400 p-2 rounded-md text-white"
                  >
                    <FaPencilAlt />
                  </button>
                  <button
                    title="Delete Message"
                    onClick={() => handleDeleteMessage(post?._id)}
                    className="bg-gray-400 p-2 rounded-md text-white"
                  >
                    <FaRegTrashAlt />
                  </button>
                </div>
              )}
          </div>
          {isEditMessage.status && isEditMessage.id === post?._id ? (
            <div className="flex flex-col gap-3">
              <p>
                <textarea
                  defaultValue={post.text}
                  onChange={(e) => setEditedMessage(e.target.value)}
                  name="text"
                  id="text"
                  className="border-2 border-gray-300 px-2 w-full rounded-md focus:outline-none focus:border-blue-500 flex-grow"
                />
              </p>
              <p className="flex gap-2">
                <button
                  onClick={() => setIsEditMessage({ id: "", status: false })}
                  className="bg-gray-400 px-3 rounded-sm"
                >
                  cancel
                </button>
                <button
                  onClick={handleEditMessage}
                  className="bg-blue-400 px-3 rounded-sm"
                >
                  save
                </button>
              </p>
            </div>
          ) : (
            <p className="text-gray-800 mb-4">{post?.text}</p>
          )}

          {post?.images?.length > 0 && (
            <div className="my-4 flex flex-wrap gap-4">
              {post?.images?.map((image, imageIndex) => (
                <img
                  onClick={() => handleShowImageFullScreen(image)}
                  key={imageIndex}
                  src={image}
                  alt={"message image"}
                  className="w-20 h-20 rounded-md cursor-pointer"
                />
              ))}
            </div>
          )}

          {/* image showing full screen modal  */}
          {imageModalOpen && selectedImage && (
            <ShowImageFullScreen
              image={selectedImage}
              setSelectedImage={setSelectedImage}
              setImageModalOpen={setImageModalOpen}
            />
          )}

          {post?.files?.length > 0 && (
            <div className="mb-4">
              {post?.files?.map((file, fileIndex) => (
                <a
                  key={fileIndex}
                  href={file}
                  className="text-blue-500 hover:underline block mb-2"
                >
                  <small>{file}</small>
                </a>
              ))}
            </div>
          )}

          {post?.links?.length > 0 && (
            <div className="mb-4">
              {post?.links?.map((link, linkIndex) => (
                <a
                  key={linkIndex}
                  href={link}
                  className="text-blue-500 hover:underline block mb-2"
                >
                  <small>{link}</small>
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ShowMessages;
