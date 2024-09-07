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
import {
  handleDeletedMessage,
  handleNewMessage,
  handleUpdatedMessage,
} from "../common/utilFunctions";

const MessageContainer = () => {
  const { socket, realTimeMessages, setRealTimeMessages }: any =
    useContext(SocketContext);
  const { query } = useRouter();
  const { data: userData } = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const { data: messageData, isLoading } = useGetOneToOneMessagesQuery(
    `${query?.participantId}&${user?.id}`
  );

  // Socket event listeners
  useEffect(() => {
    socket?.on("one-to-one-message", (data: IMessagePayloadForSocket) => {
      const conversionId = `${user.id}&${query?.participantId}`;
      if (conversionId.toString() === data?.conversationId.toString()) {
        console.log("one-to-one-message", data);
        handleNewMessage(data, setRealTimeMessages);
      }
    });
    socket?.on("updated-message", (data: IMessagePayloadForSocket) => {
      console.log("updated-message", data);
      handleUpdatedMessage(data, setRealTimeMessages);
    });
    socket?.on("deleted-message", (messageId: string) => {
      console.log("deleted-message", messageId);
      handleDeletedMessage(messageId, setRealTimeMessages);
    });

    return () => {
      socket?.off("one-to-one-message", handleNewMessage);
      socket?.off("updated-message", handleUpdatedMessage);
      socket?.off("deleted-message", handleDeletedMessage);
    };
  }, [socket, realTimeMessages, setRealTimeMessages]);

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
