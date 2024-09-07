import GetHead from "@/utils/Head";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import MessageForm from "../../../components/pages/messages/common/MessageForm";
import { SocketContext } from "@/context/SocketContext";
import isAuthenticate from "@/components/HOC/isAuthenticate";
import MessageSidebar from "@/components/pages/messages/one-to-one-message/MessageSidebar";
import MessageContainer from "@/components/pages/messages/one-to-one-message/MessageContainer";
import { useGetSingleUserQuery, useLoggedInUserQuery } from "@/features/user";
import { IUser } from "@/interfaces/user.interface";
import { FaArrowLeft } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import Link from "next/link";
import dynamic from "next/dynamic";
import { MenuProps } from "antd";
import toast from "react-hot-toast";
const Dropdown: any = dynamic(() => import("antd/lib/dropdown"), {
  ssr: false,
  loading: () => <BsThreeDotsVertical className="text-2xl" />,
});
const Button: any = dynamic(() => import("antd/lib/button"), {
  ssr: false,
  loading: () => <BsThreeDotsVertical className="text-2xl" />,
});

const MessagesPage = () => {
  const router = useRouter();
  const query = router.query;
  const participantId = query?.participantId as string;
  const messagesContainerRefDesktop = useRef<HTMLDivElement | null>(null);
  const messagesContainerRefMobile = useRef<HTMLDivElement | null>(null);
  const { socket, realTimeMessages, setRealTimeMessages }: any =
    useContext(SocketContext);
  const { data: singleUser } = useGetSingleUserQuery(participantId);
  const participant = singleUser?.data;
  const { data: userData } = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const [onTypingFriends, setOnTypingFriends] = useState<string[]>([]);

  // receive events from socket
  useEffect(() => {
    const handleTyping = (senderId: string) => {
      console.log(`This sender '${senderId}' is typing`);
      if (!onTypingFriends.includes(senderId)) {
        setOnTypingFriends((prev) => [...prev, senderId]);
      }
    };

    const handleStopTyping = (senderId: string) => {
      console.log(`This sender '${senderId}' has stopped typing.`);
      setOnTypingFriends((prev) => prev.filter((id) => id !== senderId));
    };

    socket?.on("typing-message", handleTyping);
    socket?.on("stop-typing-message", handleStopTyping);

    return () => {
      socket?.off("typing-message", handleTyping);
      socket?.off("stop-typing-message", handleStopTyping);
    };
  }, [socket, onTypingFriends]);

  // keep user visibility at bottom always
  useEffect(() => {
    const scrollToBottom = (ref: React.RefObject<HTMLDivElement>) => {
      if (ref.current) {
        ref.current.scrollTop = ref.current.scrollHeight;
      }
    };

    scrollToBottom(messagesContainerRefDesktop);
    scrollToBottom(messagesContainerRefMobile);
  }, [realTimeMessages, socket, setRealTimeMessages]);

  const actions: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Button
          onClick={() =>
            toast.success(
              "Feature not available. Stay with us to get this feature. Thank you!"
            )
          }
          type="default"
        >
          Clear chat
        </Button>
      ),
    },
    {
      key: "2",
      label: (
        <Button
          onClick={() =>
            toast.success(
              "Feature not available. Stay with us to get this feature. Thank you!"
            )
          }
          type="default"
        >
          Delete chat
        </Button>
      ),
    },
  ];
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
            <div className="flex justify-between items-center gap-2 p-[6.5px] bg-gray-200 border-b border-s-2 border-gray-300">
              <div className="flex  items-center gap-2">
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
                      participantId === user.id ? "(You)" : ""
                    }`}
                  </h2>
                  {participantId === user?.id ? (
                    <small className="text-[10px] lg:text-md">
                      Message yourself
                    </small>
                  ) : (
                    <>
                      {participant?.designation && (
                        <small className="text-[10px] lg:text-md">
                          {onTypingFriends.includes(participantId)
                            ? "Typing..."
                            : participant?.designation}
                        </small>
                      )}
                    </>
                  )}
                </div>
              </div>
              <Dropdown
                menu={{ items: actions }}
                placement="bottomRight"
                arrow
                className="p-0"
              >
                <Button type="text">
                  <BsThreeDotsVertical className="text-2xl" />
                </Button>
              </Dropdown>
            </div>
            <div
              ref={messagesContainerRefDesktop}
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
              <Link href={"/messages/chats"}>
                <FaArrowLeft />
              </Link>
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
                    participantId === user.id ? "(You)" : ""
                  }`}
                </h2>
                {participantId === user?.id ? (
                  <small className="text-[10px] lg:text-md">
                    Message yourself
                  </small>
                ) : (
                  <>
                    {participant?.designation && (
                      <small className="text-[10px] lg:text-md">
                        {onTypingFriends.includes(participantId)
                          ? "Typing..."
                          : participant?.designation}
                      </small>
                    )}
                  </>
                )}
              </div>
            </div>
            <div
              ref={messagesContainerRefMobile}
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
