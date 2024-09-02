import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { GrProjects, GrResources } from "react-icons/gr";
import { RiMessage2Line } from "react-icons/ri";
import { TbSpeakerphone } from "react-icons/tb";
import { GoHome } from "react-icons/go";
import { GiTeamIdea } from "react-icons/gi";
import { RiWechatChannelsFill } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import { useLoggedInUserQuery } from "@/features/user";
import { IUser } from "@/interfaces/user.interface";
import { SocketContext } from "@/context/SocketContext";
import { GoDotFill } from "react-icons/go";
import dynamic from "next/dynamic";
import { IMessagePayloadForSocket } from "@/interfaces/message.interface";

const Tooltip: any = dynamic(() => import("antd/lib/tooltip"), {
  ssr: false,
});

type Props = {
  activeChannel: string;
  setActiveChannel: (value: string) => void;
};

const MessageSidebar = ({ activeChannel, setActiveChannel }: Props) => {
  const { socket }: any = useContext(SocketContext);
  const { data: userData } = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const queries = `userId=${user?.id}&name=${user?.name}&email=${user?.email}`;
  const [upcomingMessageType, setUpcomingMessageType] = useState<string[]>([]);

  useEffect(() => {
    const handleMessage = (data: IMessagePayloadForSocket) => {
      if (
        data?.type !== activeChannel &&
        !upcomingMessageType?.includes(data?.type)
      ) {
        setUpcomingMessageType((prev) => [...prev, data?.type]);
      }
    };
    socket?.on("team-message", handleMessage);
    return () => {
      socket?.off("team-message", handleMessage);
    };
  }, [socket]);

  const handleNavigateChannel = (channel: string) => {
    setActiveChannel(channel);
    if (upcomingMessageType.includes(channel)) {
      const remaining = upcomingMessageType.filter(
        (msgType) => msgType !== channel
      );
      setUpcomingMessageType(remaining);
    }
  };

  return (
    <>
      <aside className="w-1/5 bg-gray-200 flex flex-col h-screen">
        <div className="flex items-center lg:gap-2 p-4 lg:p-4 bg-gray-200 text-gray-800 shadow-md">
          <RiWechatChannelsFill className="text-3xl" />
          <h1 className="hidden lg:block text-sm lg:text-xl font-bold ">
            Channels
          </h1>
        </div>
        <div className="flex-grow overflow-y-auto">
          <div className="flex flex-col justify-between h-full">
            <ul className="flex flex-col justify-between gap-2">
              <li className="w-full flex justify-between items-center">
                <button
                  title="Discussion"
                  className={`${
                    activeChannel === "discussion" && "bg-blue-600 text-white"
                  } px-2 lg:px-4 py-2 lg:py-3 relative flex items-center justify-between gap-2 text-xl text-gray-700 shadow-md w-full`}
                  onClick={() => handleNavigateChannel("discussion")}
                >
                  <span className="flex items-center gap-2">
                    <RiMessage2Line />
                    <small className="hidden lg:block">Discussion</small>
                  </span>
                  {upcomingMessageType.includes("discussion") && (
                    <>
                      <GoDotFill
                        className="text-red-500 text-end absolute right-0 z-50 top-[20%] lg:top-[35%]"
                        title="New message comes"
                      />
                      <Tooltip
                        placement="rightTop"
                        title={"You got new messages"}
                        arrow={{ pointAtCenter: true }}
                        defaultOpen={true}
                        className="absolute right-0 z-50 top-2"
                        color={"blue"}
                      />
                    </>
                  )}
                </button>
              </li>
              <li className="w-full">
                <button
                  title="Announcement"
                  onClick={() => handleNavigateChannel("announcement")}
                  className={`${
                    activeChannel === "announcement" && "bg-blue-600 text-white"
                  } px-2 lg:px-4 py-2 lg:py-3 relative flex justify-between items-center gap-2 text-xl text-gray-700 shadow-md w-full`}
                >
                  <span className="flex items-center gap-2">
                    <TbSpeakerphone />
                    <small className="hidden lg:block">Announcement</small>
                  </span>
                  {upcomingMessageType.includes("announcement") && (
                    <>
                      <GoDotFill
                        className="text-red-500 text-end absolute right-0 z-50 top-[20%] lg:top-[35%]"
                        title="New message comes"
                      />
                      <Tooltip
                        placement="rightTop"
                        title={"You got new messages"}
                        arrow={{ pointAtCenter: true }}
                        defaultOpen={true}
                        className="absolute right-0 z-50 top-2"
                        color={"blue"}
                      />
                    </>
                  )}
                </button>
              </li>
              <li className="w-full">
                <button
                  title="Resources"
                  className={`${
                    activeChannel === "resources" && "bg-blue-600 text-white"
                  } px-2 lg:px-4 py-2 lg:py-3 relative flex justify-between items-center gap-2 text-xl text-gray-700 shadow-md w-full`}
                  onClick={() => handleNavigateChannel("resources")}
                >
                  <span className="flex items-center gap-2">
                    <GrResources />
                    <small className="hidden lg:block">Resources</small>
                  </span>
                  {upcomingMessageType.includes("resources") && (
                    <>
                      <GoDotFill
                        className="text-red-500 text-end absolute right-0 z-50 top-[20%] lg:top-[35%]"
                        title="New message comes"
                      />
                      <Tooltip
                        placement="rightTop"
                        title={"You got new messages"}
                        arrow={{ pointAtCenter: true }}
                        defaultOpen={true}
                        className="absolute right-0 z-50 top-2"
                        color={"blue"}
                      />
                    </>
                  )}
                </button>
              </li>
            </ul>
            <div className="mb-16 lg:mb-0">
              <ul className="flex flex-col justify-between gap-3">
                <li className="w-full">
                  <Link
                    className={`px-4 py-2 flex items-center gap-2 text-xl text-gray-700 shadow-md w-full`}
                    href={"/"}
                  >
                    <GoHome />
                    <small className="hidden lg:block">Home</small>
                  </Link>
                </li>
                <li className="w-full">
                  <Link
                    className={`px-4 py-2 flex items-center gap-2 text-xl text-gray-700 shadow-md w-full`}
                    href={`/dashboard/profile?${queries}`}
                  >
                    <MdDashboard />
                    <small className="hidden lg:block">Dashboard</small>
                  </Link>
                </li>
                <li className="w-full">
                  <Link
                    className={`px-4 py-2 flex items-center gap-2 text-xl text-gray-700 shadow-md w-full`}
                    href={`/teams/my-teams?${queries}`}
                  >
                    <GiTeamIdea />
                    <small className="hidden lg:block">My Teams</small>
                  </Link>
                </li>
                <li className="w-full">
                  <Link
                    className={`px-4 py-2 flex items-center gap-2 text-xl text-gray-700 shadow-md w-full`}
                    href={`/projects/my-projects?${queries}`}
                  >
                    <GrProjects />
                    <small className="hidden lg:block">My Projects</small>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default MessageSidebar;
