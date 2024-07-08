/* eslint-disable @next/next/no-img-element */
import ShowImageFullScreen from "@/components/shared/ShowImageFullScreen";
import { SocketContext } from "@/context/SocketContext";
import {
  useDeleteMessageMutation,
  useEditMessageMutation,
} from "@/features/message";
import { useLoggedInUserQuery } from "@/features/user";
import { IMessage } from "@/interfaces/message.interface";
import { IUser } from "@/interfaces/user.interface";
import React, { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaRegTrashAlt, FaPencilAlt } from "react-icons/fa";
import moment from "moment";
import { formattedDate } from "@/utils/formattedDate";
import { ITeam } from "@/interfaces/team.interface";

interface Props {
  messages: IMessage[];
  team: ITeam;
}

const ShowMessages = ({ messages, team }: Props) => {
  const { socket, realTimeMessages, setRealTimeMessages }: any =
    useContext(SocketContext);
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
    const handleMessage = (data: IMessage) => {
      setRealTimeMessages((prev: IMessage[]) => [...prev, data]);
    };

    socket?.on("message", handleMessage);

    return () => {
      socket?.off("message", handleMessage);
    };
  }, [setRealTimeMessages, socket]);

  // keep updated message in state
  useEffect(() => {
    setRealTimeMessages(messages);
  }, [messages, setRealTimeMessages]);

  // keep user in the bottom of the message
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [realTimeMessages, socket]);

  return (
    <div
      ref={messagesContainerRef}
      className="mx-auto mt-8 h-screen  overflow-hidden hover:overflow-auto  scrollbar scrollbar-w-[4px] scrollbar-thumb-blue-600 scrollbar-thin-rounded-md scrollbar-track-slate-100"
    >
      {realTimeMessages?.map((post: IMessage, index: number) => (
        <div
          key={post?.id}
          className="mx-auto border-b py-6"
          onMouseOver={() => setIsEdit({ index: index, status: true })}
          onMouseLeave={() => setIsEdit({ index: 0, status: false })}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center mb-4">
              <img
                src={post?.poster?.profile_picture}
                alt={post?.poster?.name}
                className="w-10 h-10 rounded-full mr-4"
              />
              <div className="flex flex-col gap-1">
                <span className="font-bold text-xs lg:text-lg">
                  {post?.poster?.name}
                </span>
                <span className="text-sm text-gray-500">
                  {moment(post?.createdAt).fromNow()}
                </span>
              </div>
            </div>
            {(isEdit.status &&
              isEdit?.index === index &&
              user?.id === post?.poster?.id) ||
              (user?.id === team?.admin?.id && (
                <div className="flex items-center gap-3 mb-4">
                  {user.id === post.poster.id && (
                    <button
                      title="Edit Message"
                      onClick={() =>
                        setIsEditMessage({ id: post?.id, status: true })
                      }
                      className="bg-gray-400 p-2 rounded-md text-white"
                    >
                      <FaPencilAlt className="text-xs lg:text-xl" />
                    </button>
                  )}
                  <button
                    title="Delete Message"
                    onClick={() => handleDeleteMessage(post?.id)}
                    className="bg-gray-400 p-2 rounded-md text-white"
                  >
                    <FaRegTrashAlt className="text-xs lg:text-xl" />
                  </button>
                </div>
              ))}
          </div>
          {isEditMessage?.status && isEditMessage.id === post?.id ? (
            <div className="flex flex-col gap-1 mb-2">
              <p>
                <textarea
                  defaultValue={post.text}
                  onChange={(e) => setEditedMessage(e.target.value)}
                  name="text"
                  id="text"
                  className="border-2 border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-500"
                />
              </p>
              <p className="flex gap-2">
                <button
                  onClick={() => setIsEditMessage({ id: "", status: false })}
                  className="border px-3 rounded-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditMessage}
                  className="border px-3 rounded-sm"
                >
                  Save
                </button>
              </p>
            </div>
          ) : (
            <p className="mb-4">{post?.text}</p>
          )}

          {post?.images?.length > 0 && (
            <div className="my-4 flex flex-wrap gap-4">
              {post?.images?.map((image: string, imageIndex: number) => (
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
              {post?.files?.map((file: string, fileIndex: number) => (
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
              {post?.links?.map((link: string, linkIndex: number) => (
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
          <p>{formattedDate(post.createdAt)}</p>
        </div>
      ))}
    </div>
  );
};

export default ShowMessages;
