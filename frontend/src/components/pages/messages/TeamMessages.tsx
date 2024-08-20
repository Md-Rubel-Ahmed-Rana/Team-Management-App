import { useState } from "react";
import { AiOutlineTeam } from "react-icons/ai";
import { GrResources } from "react-icons/gr";
import { RiMessage2Line } from "react-icons/ri";
import { TbSpeakerphone } from "react-icons/tb";
import { useSingleTeamQuery } from "@/features/team";
import { useRouter } from "next/router";
import AnnouncementChannel from "./channels/Announcement";
import ResourcesChannel from "./channels/Resources";
import DiscussionChannel from "./channels/Discussion";

const TeamMessages = () => {
  const { query } = useRouter();
  const [activeNav, setActiveNav] = useState<any>("Discussion");
  const { data: singleTeam } = useSingleTeamQuery(query?.teamId);

  const handleChangeCollaborate = (text: string) => {
    setActiveNav(text);
  };
  return (
    <div className="h-screen flex p-2">
      <div className="w-1/5">
        <nav>
          <ul className="flex flex-col justify-between gap-3">
            <li className="w-full">
              <button
                title="Announcement"
                onClick={() => handleChangeCollaborate("Announcement")}
                className={`${
                  activeNav === "Announcement" && "bg-gray-200 dark:bg-gray-600"
                }   px-4 py-2 flex justify-center items-center gap-2 text-xl rounded-md shadow-md w-full`}
              >
                <TbSpeakerphone />
                <small className="hidden lg:block">Announcement</small>
              </button>
            </li>
            <li className="w-full">
              <button
                title="Resources"
                className={`${
                  activeNav === "Resources" && "bg-gray-200 dark:bg-gray-600"
                }   px-4 py-2 flex justify-center items-center gap-2 text-xl rounded-md shadow-md w-full`}
                onClick={() => handleChangeCollaborate("Resources")}
              >
                <GrResources />
                <small className="hidden lg:block">Resources</small>
              </button>
            </li>
            <li className="w-full">
              <button
                title="Discussion"
                className={`${
                  activeNav === "Discussion" && "bg-gray-200 dark:bg-gray-600"
                }   px-4 py-2 flex justify-center items-center gap-2 text-xl rounded-md shadow-md w-full`}
                onClick={() => handleChangeCollaborate("Discussion")}
              >
                <RiMessage2Line />
                <small className="hidden lg:block">Discussion</small>
              </button>
            </li>
            <li className="block lg:hidden">
              <button
                className={`${
                  activeNav === "Team" && "bg-gray-200 dark:bg-gray-600"
                }   px-4 py-2 flex justify-center items-center gap-2 text-xl rounded-md shadow-md w-full`}
                onClick={() => handleChangeCollaborate("Team")}
              >
                <AiOutlineTeam />
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <hr className="mx-2 h-screen border-2" />
      <div className="w-4/5 p-2">
        {activeNav === "Announcement" && (
          <AnnouncementChannel team={singleTeam?.data} />
        )}
        {activeNav === "Resources" && (
          <ResourcesChannel team={singleTeam?.data} />
        )}
        {activeNav === "Discussion" && (
          <DiscussionChannel team={singleTeam?.data} />
        )}
      </div>
    </div>
  );
};

export default TeamMessages;
