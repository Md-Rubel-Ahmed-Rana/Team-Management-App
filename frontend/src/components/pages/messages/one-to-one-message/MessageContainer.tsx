/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect } from "react";
import { SocketContext } from "@/context/SocketContext";
import { useGetOneToOneMessagesQuery } from "@/features/message";
import {
  IMessage,
  IMessagePayloadForSocket,
} from "@/interfaces/message.interface";
import { useRouter } from "next/router";
import MessageCard from "../common/MessageCard";
import MessageSkeleton from "@/components/skeletons/MessageSkeleton";
import { useLoggedInUserQuery } from "@/features/user";
import { IUser } from "@/interfaces/user.interface";

// Function to handle new messages
const handleNewMessage = (
  data: IMessagePayloadForSocket,
  setRealTimeMessages: React.Dispatch<
    React.SetStateAction<IMessagePayloadForSocket[]>
  >
) => {
  setRealTimeMessages((prev: IMessagePayloadForSocket[]) => [...prev, data]);
};

// Function to handle updated messages
const handleUpdatedMessage = (
  data: IMessagePayloadForSocket,
  setRealTimeMessages: React.Dispatch<
    React.SetStateAction<IMessagePayloadForSocket[]>
  >
) => {
  setRealTimeMessages((prevMessages: IMessagePayloadForSocket[]) => {
    const findIndex = prevMessages.findIndex(
      (message) => message?.id === data?.id
    );
    if (findIndex !== -1) {
      const updatedMessages = [...prevMessages];
      updatedMessages[findIndex] = data;
      return updatedMessages;
    }
    return prevMessages;
  });
};

// Function to handle deleted messages
const handleDeletedMessage = (
  messageId: string,
  setRealTimeMessages: React.Dispatch<
    React.SetStateAction<IMessagePayloadForSocket[]>
  >
) => {
  setRealTimeMessages((prevMessages: IMessagePayloadForSocket[]) =>
    prevMessages.filter((message) => message.id !== messageId)
  );
};

const MessageContainer = () => {
  const { socket, realTimeMessages, setRealTimeMessages }: any =
    useContext(SocketContext);
  const { query } = useRouter();
  const { data: userData } = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const { data: messageData, isLoading } = useGetOneToOneMessagesQuery(
    `${query?.participant}&${user?.id}`
  );

  // Socket event listeners
  useEffect(() => {
    socket?.on("one-to-one-message", (data: IMessagePayloadForSocket) =>
      handleNewMessage(data, setRealTimeMessages)
    );
    socket?.on("updated-message", (data: IMessagePayloadForSocket) =>
      handleUpdatedMessage(data, setRealTimeMessages)
    );
    socket?.on("deleted-message", (messageId: string) =>
      handleDeletedMessage(messageId, setRealTimeMessages)
    );

    return () => {
      socket?.off("one-to-one-message", handleNewMessage);
      socket?.off("updated-message", handleUpdatedMessage);
      socket?.off("deleted-message", handleDeletedMessage);
    };
  }, [socket, setRealTimeMessages]);

  // Load messages when the component mounts or query changes
  useEffect(() => {
    if (!isLoading) {
      setRealTimeMessages(messageData?.data || []);
    }
  }, [isLoading, messageData, setRealTimeMessages]);

  return (
    <>
      {isLoading ? (
        <MessageSkeleton />
      ) : (
        <>
          {realTimeMessages?.length <= 0 ? (
            <div className="flex justify-center items-center h-full">
              <h2 className="text-2xl font-semibold">No message</h2>
            </div>
          ) : (
            <>
              {realTimeMessages?.map((message: IMessage) => (
                <MessageCard message={message} key={message.id} />
              ))}
            </>
          )}
        </>
      )}
    </>
  );
};

export default MessageContainer;
