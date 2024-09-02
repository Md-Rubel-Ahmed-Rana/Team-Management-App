import GetHead from "@/utils/Head";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState, useCallback } from "react";
import MessageForm from "../../../components/pages/messages/common/MessageForm";
import { SocketContext } from "@/context/SocketContext";
import isAuthenticate from "@/components/HOC/isAuthenticate";
import MessageSidebar from "@/components/pages/messages/one-to-one-message/MessageSidebar";
import MessageContainer from "@/components/pages/messages/one-to-one-message/MessageContainer";
import { useGetSingleUserQuery, useLoggedInUserQuery } from "@/features/user";
import { IUser } from "@/interfaces/user.interface";
import { FaArrowLeft } from "react-icons/fa";

const MessagesPage = () => {
  const router = useRouter();
  const query = router.query;
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const { socket, realTimeMessages, setRealTimeMessages }: any =
    useContext(SocketContext);
  const { data: singleUser } = useGetSingleUserQuery(query?.participant);
  const participant = singleUser?.data;
  const { data: userData } = useLoggedInUserQuery({});
  const user: IUser = userData?.data;

  // Scroll to the bottom when new messages arrive
  const scrollToBottom = useCallback(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messagesContainerRef]);

  useEffect(() => {
    scrollToBottom();
  }, [realTimeMessages, scrollToBottom, socket, setRealTimeMessages]);

  return (
    <>
      <GetHead
        title={`Messages - ${query?.name || participant?.name}: Team Manager `}
        description="team management, project collaboration, task tracking, project details"
        keywords="team management, project collaboration, task tracking, project details"
      />

      <div className="hidden lg:block">
        <div className="flex justify-center items-center h-screen w-full bg-gray-100">
          <MessageSidebar />
          <main className="flex-grow flex flex-col h-full w-full">
            <div className="flex items-center gap-2 p-[6.5px] bg-gray-200 border-b border-s-2 border-gray-300">
              <img
                className="h-12 w-12 rounded-full ring-2"
                src={
                  (query?.profile_picture as string) ||
                  participant?.profile_picture
                }
                alt={`User profile picture - ${
                  query?.name || participant?.name
                }`}
              />
              <div>
                <h2 className="text-sm lg:text-xl font-bold text-gray-700 -mb-2">
                  {`${query?.name || participant?.name} ${
                    query?.participantId === user.id ? "(You)" : ""
                  }`}
                </h2>
                {query?.participantId === user?.id ? (
                  <small className="text-[10px] lg:text-md">
                    Message yourself
                  </small>
                ) : (
                  <>
                    {participant?.designation && (
                      <small className="text-[10px] lg:text-md">
                        {participant?.designation}
                      </small>
                    )}
                  </>
                )}
              </div>
            </div>
            <div
              ref={messagesContainerRef}
              className="flex-grow p-4 overflow-y-auto bg-white"
            >
              <MessageContainer />
            </div>
            <MessageForm messageType="one-to-one" />
          </main>
        </div>
      </div>
      <div className="block lg:hidden">
        <div className="flex justify-center items-center h-screen w-full bg-gray-100">
          <main className="flex-grow flex flex-col h-full w-full">
            <div className="flex items-center gap-2 p-[6.5px] bg-gray-200 border-b border-s-2 border-gray-300">
              <button onClick={() => router.back()}>
                <FaArrowLeft />
              </button>
              <img
                className="h-12 w-12 rounded-full ring-2"
                src={
                  (query?.profile_picture as string) ||
                  participant?.profile_picture
                }
                alt={`User profile picture - ${
                  query?.name || participant?.name
                }`}
              />
              <div>
                <h2 className="text-sm lg:text-xl font-bold text-gray-700 -mb-2">
                  {`${query?.name || participant?.name} ${
                    query?.participantId === user.id ? "(You)" : ""
                  }`}
                </h2>
                {query?.participantId === user?.id ? (
                  <small className="text-[10px] lg:text-md">
                    Message yourself
                  </small>
                ) : (
                  <>
                    {participant?.designation && (
                      <small className="text-[10px] lg:text-md">
                        {participant?.designation}
                      </small>
                    )}
                  </>
                )}
              </div>
            </div>
            <div
              ref={messagesContainerRef}
              className="flex-grow p-4 overflow-y-auto bg-white"
            >
              <MessageContainer />
            </div>
            <MessageForm messageType="one-to-one" />
          </main>
        </div>
      </div>
    </>
  );
};

export default isAuthenticate(MessagesPage);
