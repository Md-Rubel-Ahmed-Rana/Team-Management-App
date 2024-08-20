/* eslint-disable @next/next/no-img-element */
import { SocketContext } from "@/context/SocketContext";
import { useGetMessagesByTypeQuery } from "@/features/message";
import { IMessage } from "@/interfaces/message.interface";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import MessageCard from "./MessageCard";

interface Props {
  messageType: string;
}

const MessageMainContainer = ({ messageType }: Props) => {
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
      console.log("real time message", data);
      setRealTimeMessages((prev: IMessage[]) => [...prev, data]);
    };

    console.log("Inside real time message");
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

  console.log(realTimeMessages);

  return (
    <>
      {isLoading ? (
        <h2>Loading message</h2>
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

export default MessageMainContainer;
