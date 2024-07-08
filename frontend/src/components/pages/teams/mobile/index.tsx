import React, { useState } from "react";
import Chat from "./chat";
import TeamInfo from "./teamInfo";
import { useRouter } from "next/router";
import { useSingleTeamQuery } from "@/features/team";
import { ITeam } from "@/interfaces/team.interface";

const TeamDetailsMobilePage = () => {
  const [active, setActive] = useState("Team info");
  const [isChat, setIsChat] = useState(false);
  const router = useRouter();
  const { data: teamData } = useSingleTeamQuery(router?.query?.id);
  const team: ITeam = teamData?.data;

  const handleActive = (text: string) => {
    if (text === "Chat") {
      setIsChat(true);
      setActive(text);
    } else {
      setIsChat(false);
      setActive(text);
    }
  };

  return (
    <div>
      {!isChat && (
        <div className="flex justify-between items-center gap-3 p-4">
          <p className="w-1/2">
            <button
              onClick={() => handleActive("Team info")}
              className={`border w-full px-4 py-2 rounded-md text-lg font-semibold ${
                active === "Team info" && "bg-gray-200 dark:bg-gray-600"
              }`}
            >
              Team info
            </button>
          </p>
          <p className="w-1/2">
            <button
              onClick={() => handleActive("Chat")}
              className={`border w-full px-4 py-2 rounded-md text-lg font-semibold ${
                active === "Chat" && "bg-gray-200 dark:bg-gray-600"
              }`}
            >
              Chat
            </button>
          </p>
        </div>
      )}
      {isChat ? (
        <Chat team={team} handleActive={handleActive} />
      ) : (
        <TeamInfo team={team} />
      )}
    </div>
  );
};

export default TeamDetailsMobilePage;
