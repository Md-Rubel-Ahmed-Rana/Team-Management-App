import GetHead from "@/utils/Head";
import isAuthenticate from "@/components/HOC/isAuthenticate";
import MessageSidebar from "@/components/pages/messages/one-to-one-message/MessageSidebar";
import { MdMessage } from "react-icons/md";
import MobileLayout from "@/components/pages/messages/one-to-one-message/MobileLayout";

const MessagesPage = () => {
  return (
    <>
      <GetHead
        title={`Messages : Team Manager `}
        description="team management, project collaboration, task tracking, project details"
        keywords="team management, project collaboration, task tracking, project details"
      />
      <div className="hidden lg:block">
        <div className="flex justify-center items-center h-screen w-full bg-gray-100">
          <MessageSidebar />
          <main className="flex-grow flex flex-col justify-center items-center h-full w-full bg-white  shadow-lg p-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Welcome to your Messages
              </h1>
              <p className="text-gray-600 mb-6">
                Start a conversation with your team members to collaborate and
                keep track of your projects.
              </p>
              <button className="">
                <MdMessage className="text-6xl text-blue-500 mb-4" />
              </button>
            </div>
          </main>
        </div>
      </div>
      <div className="bg-gray-100 block lg:hidden">
        <MobileLayout />
      </div>
    </>
  );
};

export default isAuthenticate(MessagesPage);
