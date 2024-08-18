/* eslint-disable @next/next/no-img-element */
import { useContext, useEffect, useState } from "react";
import Announcement from "../collaborations/announcements/Announcement";
import Resources from "../collaborations/resources/Resources";
import Discussion from "../collaborations/discussions/Discussion";
import { useRouter } from "next/router";
import { useSingleTeamQuery } from "@/features/team";
import { ITeam } from "@/interfaces/team.interface";
import { TbSpeakerphone } from "react-icons/tb";
import { GrResources } from "react-icons/gr";
import { RiMessage2Line } from "react-icons/ri";
import { SocketContext } from "@/context/SocketContext";
import TeamMemberTable from "../teamMemberTable";
import { AiOutlineTeam } from "react-icons/ai";

const TeamDetailsPage = () => {
  const { socket }: any = useContext(SocketContext);
  const router = useRouter();
  const { data: teamData } = useSingleTeamQuery(router?.query?.id);
  const team: ITeam = teamData?.data;
  const [activeNav, setActiveNav] = useState<any>("Discussion");

  const handleChangeCollaborate = (text: string) => {
    setActiveNav(text);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, collaborate: text },
    });
  };

  // connect to socket team room
  useEffect(() => {
    socket?.emit("join-room", team?.id);
  }, [socket, team?.id]);

  useEffect(() => {
    setActiveNav(router?.query?.collaborate);
  }, [router?.query?.collaborate]);

  return (
    <div className="lg:flex gap-5">
      <div
        className={`lg:w-3/5 hidden lg:block border-r-2 flex flex-col gap-10 p-2`}
      >
        <div className="flex flex-col gap-2 mb-2">
          <h3 className="text-2xl font-semibold">{team?.name}</h3>
          <h5 className="text-lg font-sans">{team?.category}</h5>
          <p className="text-sm font-light">{team?.description}</p>
        </div>
        <TeamMemberTable team={team} />
      </div>
      <div className="lg:w-2/5 p-2">
        <nav className="p-4 shadow-md rounded-md">
          <ul className="flex justify-between gap-3">
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
        {activeNav === "Team" ? (
          <div className={`lg:w-3/5  border-r-2 flex flex-col gap-10 p-2`}>
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl font-semibold">{team?.name}</h3>
              <h5 className="text-lg font-sans">{team?.category}</h5>
              <p className="text-sm font-light">{team?.description}</p>
            </div>
            <TeamMemberTable team={team} />
          </div>
        ) : (
          <div>
            {activeNav === "Announcement" && <Announcement team={team} />}
            {activeNav === "Resources" && <Resources team={team} />}
            {activeNav === "Discussion" && <Discussion team={team} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamDetailsPage;
