import GetHead from "@/utils/Head";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState, useCallback } from "react";
import MessageForm from "../../../components/pages/messages/MessageForm";
import MessageSidebar from "../../../components/pages/messages/MessageSidebar";
import MessageContainer from "../../../components/pages/messages/MessageContainer";
import { SocketContext } from "@/context/SocketContext";
import { useSingleTeamQuery } from "@/features/team";
import isAuthenticate from "@/components/HOC/isAuthenticate";

const MessagesPage = () => {
  const { query } = useRouter();
  const [activeChannel, setActiveChannel] = useState<any>("discussion");
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const { socket, realTimeMessages, setRealTimeMessages }: any =
    useContext(SocketContext);
  const { data: singleTeam } = useSingleTeamQuery(query.teamId);

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

  // connect to socket team room
  useEffect(() => {
    socket?.emit("team-join-room", query?.teamId);
  }, [socket, query?.teamId]);

  return (
    <>
      <GetHead
        title={`Messages - ${query?.team_name || "Team"}: Team Manager `}
        description="team management, project collaboration, task tracking, project details"
        keywords="team management, project collaboration, task tracking, project details"
      />
      <div className="flex justify-center items-center h-screen w-full bg-gray-100">
        <MessageSidebar
          activeChannel={activeChannel}
          setActiveChannel={setActiveChannel}
        />
        <main className="flex-grow flex flex-col h-full w-full">
          <div className="flex items-center gap-2 p-[6.5px] bg-gray-200 border-b border-s-2 border-gray-300">
            <img
              className="h-12 w-12 rounded-full ring-2"
              src={singleTeam?.data?.image}
              alt={`Team logo - ${query?.team_name}`}
            />
            <div>
              <h2 className="text-sm lg:text-xl font-bold text-gray-700 -mb-2">
                {singleTeam?.data?.team_name || query?.team_name}
              </h2>
              <small className="text-[10px] lg:text-md">
                {singleTeam?.data?.category || query?.team_category}
              </small>
            </div>
          </div>
          <div
            ref={messagesContainerRef}
            className="flex-grow p-4 overflow-y-auto bg-white"
          >
            <MessageContainer messageType={activeChannel} />
          </div>
          <MessageForm messageType={activeChannel} />
        </main>
      </div>
    </>
  );
};

export default isAuthenticate(MessagesPage);
