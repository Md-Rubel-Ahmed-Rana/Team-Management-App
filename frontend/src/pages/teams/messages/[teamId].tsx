import GetHead from "@/utils/Head";
import { useRouter } from "next/router";
import { useState } from "react";
import NewMessageForm from "./NewMessageForm";
import MessageSidebar from "./MessageSidebar";
import MessageMainContainer from "./MessageMainContainer";

const MessagesPage = () => {
  const { query } = useRouter();
  const [activeChannel, setActiveChannel] = useState<any>("discussion");

  return (
    <>
      <style jsx global>{`
        html,
        body {
          height: 100%;
          margin: 0;
          overflow: hidden;
        }
      `}</style>
      <GetHead
        title={`Messages - ${query?.team_name || "Team"}: Team Manager `}
        description="team management, project collaboration, task tracking, project details"
        keywords="team management, project collaboration, task tracking, project details"
      />
      {/* <TeamMessages /> */}
      <div className="flex justify-center items-center h-screen w-full bg-gray-100">
        <MessageSidebar
          activeChannel={activeChannel}
          setActiveChannel={setActiveChannel}
        />
        <main className="flex-grow flex flex-col h-full w-full">
          <div className="p-4 bg-gray-200 border-b border-gray-300">
            <h2 className="text-xl font-bold text-gray-700">
              {query?.team_name}
            </h2>
          </div>
          <div className="flex-grow p-4 overflow-y-auto bg-white">
            <MessageMainContainer messageType={activeChannel} />
          </div>
          <NewMessageForm messageType={activeChannel} />
        </main>
      </div>
    </>
  );
};

export default MessagesPage;
