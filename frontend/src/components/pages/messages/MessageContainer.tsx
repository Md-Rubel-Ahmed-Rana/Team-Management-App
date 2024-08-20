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
import { HiDotsVertical } from "react-icons/hi";
import moment from "moment";
import { formattedDate } from "@/utils/formattedDate";
import { ITeam } from "@/interfaces/team.interface";
import { detectLinks } from "@/utils/detectLinkFromText";
import detectFileExtensionFromLink from "@/utils/detectFileExtensionFromLink";
import GetFileIcon from "@/components/shared/generateFileIconBasedExtension";
import { acceptableExtensions } from "@/constants/acceptableFiles";
import DownloadFileButton from "@/components/shared/DownloadFileButton";

interface Props {
  messages: IMessage[];
  team: ITeam;
}

const MessageContainer = ({ messages, team }: Props) => {
  const { socket, realTimeMessages, setRealTimeMessages }: any =
    useContext(SocketContext);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const [editedMessage, setEditedMessage] = useState<string | undefined>("");
  const [imageModalOpen, setImageModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [msIndex, setMsIndex] = useState<number | null>(null);
  const [isEditMessage, setIsEditMessage] = useState<any>("");
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
      setMsIndex(null);
    }
    if (result?.error) {
      toast.error("Message was not deleted");
    }
  };

  const handleShowDropdown = (index: number) => {
    if (msIndex === index) {
      setMsIndex(null);
    } else {
      setMsIndex(index);
    }
  };

  const handleEditMessage = async () => {
    const result: any = await editMessage({
      id: isEditMessage,
      text: editedMessage,
    });
    if (result?.data?.success) {
      toast.success("Message updated");
      setMsIndex(null);
      setIsEditMessage("");
    }
    if (result?.error) {
      toast.error("Message was not updated");
      setMsIndex(null);
      setIsEditMessage("");
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
      className="mx-auto h-[400px] border overflow-hidden hover:overflow-auto  scrollbar scrollbar-w-[4px] scrollbar-thumb-blue-600 scrollbar-thin-rounded-md scrollbar-track-slate-100"
    >
      {realTimeMessages?.map((post: IMessage, index: number) => (
        <div key={post?.id} className="mx-auto border-b py-6">
          <div className="flex  justify-between items-start">
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
            {(user?.id === post?.poster?.id ||
              user?.id === team?.admin?.id) && (
              <div className="relative">
                <button
                  onClick={() => handleShowDropdown(index)}
                  title="Drop down button"
                  className="bg-gray-400 p-2 rounded-md text-white"
                >
                  <HiDotsVertical className="text-xs lg:text-xl" />
                </button>
                {msIndex === index && (
                  <div className="absolute right-0 flex w-40 flex-col gap-2 top-10 rounded-md bg-gray-300 dark:bg-gray-700 z-50  p-2 text-start">
                    {user?.id === post?.poster?.id && (
                      <button
                        onClick={() => {
                          setIsEditMessage(post?.id);
                          setMsIndex(null);
                        }}
                        className="text-start w-full dark:bg-gray-800 px-2 py-1 rounded-md"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteMessage(post.id)}
                      className="text-start w-full dark:bg-gray-800 px-2 py-1 rounded-md"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleShowDropdown(index)}
                      className="text-start w-full dark:bg-gray-800 px-2 py-1 rounded-md"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          {isEditMessage === post?.id ? (
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
                  onClick={() => setIsEditMessage("")}
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
            <div
              className="mb-3"
              dangerouslySetInnerHTML={{
                __html: post?.text ? detectLinks(post?.text).join(" ") : "",
              }}
            />
          )}

          {post?.images?.length > 0 && (
            <div className="my-4 flex flex-wrap gap-4">
              {post?.images?.map((image: string, imageIndex: number) => (
                <img
                  onClick={() => handleShowImageFullScreen(image)}
                  key={imageIndex}
                  src={image}
                  alt={"message image"}
                  className="w-28 h-28 rounded-md cursor-pointer border-2"
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
            <div>
              {/* Display all files except audio and video */}
              <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                {post?.files?.map((url: string, fileIndex: number) => {
                  const extension = detectFileExtensionFromLink(url);

                  if (
                    !acceptableExtensions.audio.includes(extension) &&
                    !acceptableExtensions.video.includes(extension)
                  ) {
                    return (
                      <div
                        className="flex flex-col justify-center items-center border rounded-md"
                        key={fileIndex}
                      >
                        <GetFileIcon extension={extension} />
                        <DownloadFileButton
                          fileUrl={url}
                          extension={extension}
                        />
                      </div>
                    );
                  }
                  return null; // Skip audio and video files here
                })}
              </div>

              {/* Display video files */}
              {post?.files?.map((url: string, fileIndex: number) => {
                const extension = detectFileExtensionFromLink(url);

                if (acceptableExtensions.video.includes(extension)) {
                  return (
                    <div key={fileIndex} className="mb-4 w-full">
                      <video
                        controls
                        className="w-full h-48 border rounded-md mt-1"
                      >
                        <source
                          className="w-full"
                          src={url}
                          type={`video/${extension}`}
                        />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  );
                }
                return null;
              })}

              {/* Display audio files */}
              {post?.files?.map((url: string, fileIndex: number) => {
                const extension = detectFileExtensionFromLink(url);

                if (acceptableExtensions.audio.includes(extension)) {
                  return (
                    <div key={fileIndex} className="mb-4">
                      <audio controls className="w-full">
                        <source src={url} type={`audio/${extension}`} />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          )}

          <p className="mt-2 text-gray-400">{formattedDate(post.createdAt)}</p>
        </div>
      ))}
    </div>
  );
};

export default MessageContainer;
