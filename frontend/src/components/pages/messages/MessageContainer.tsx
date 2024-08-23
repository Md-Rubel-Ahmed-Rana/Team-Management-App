/* eslint-disable @next/next/no-img-element */
import { SocketContext } from "@/context/SocketContext";
import { useGetMessagesByTypeQuery } from "@/features/message";
import { IMessage } from "@/interfaces/message.interface";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import MessageCard from "./MessageCard";
import MessageSkeleton from "@/components/skeletons/MessageSkeleton";

interface Props {
  messageType: string;
}

const MessageContainer = ({ messageType }: Props) => {
  const { query } = useRouter();

  // Fetch messages based on messageType and conversationId
  const { data: messageData, isLoading } = useGetMessagesByTypeQuery({
    type: messageType,
    conversationId: query.teamId,
  });

  const { socket, realTimeMessages, setRealTimeMessages }: any =
    useContext(SocketContext);

  useEffect(() => {
    const handleMessage = (data: IMessage) => {
      setRealTimeMessages((prev: IMessage[]) => [...prev, data]);
    };
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

  // connect to socket team room
  useEffect(() => {
    socket?.emit("join-room", query?.teamId);
  }, [socket, query?.teamId]);

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
