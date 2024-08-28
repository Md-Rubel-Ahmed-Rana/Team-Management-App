/* eslint-disable @next/next/no-img-element */
import { SocketContext } from "@/context/SocketContext";
import { useGetMessagesByTypeQuery } from "@/features/message";
import { IMessage } from "@/interfaces/message.interface";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import MessageCard from "./MessageCard";
import MessageSkeleton from "@/components/skeletons/MessageSkeleton";

interface Props {
  messageType: string;
}

const MessageContainer = ({ messageType }: Props) => {
  const { socket, realTimeMessages, setRealTimeMessages }: any =
    useContext(SocketContext);
  const { query } = useRouter();
  // Fetch messages based on messageType and conversationId
  const { data: messageData, isLoading } = useGetMessagesByTypeQuery({
    type: messageType,
    conversationId: query.teamId,
  });

  useEffect(() => {
    const handleMessage = (data: any) => {
      if (data?.type === messageType) {
        setRealTimeMessages((prev: IMessage[]) => [...prev, data]);
      }
    };
    socket?.on("message", handleMessage);
    return () => {
      socket?.off("message", handleMessage);
    };
  }, [setRealTimeMessages, socket]);

  // Keep updated messages in state whenever messageData or messageType changes
  useEffect(() => {
    if (!isLoading) {
      setRealTimeMessages(messageData?.data || []);
    }
  }, [isLoading, messageData, messageType, setRealTimeMessages]);

  return (
    <>
      {isLoading ? (
        <MessageSkeleton />
      ) : (
        <>
          {realTimeMessages.length <= 0 ? (
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
