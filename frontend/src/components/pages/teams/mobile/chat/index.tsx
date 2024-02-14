import { ITeam } from "@/interfaces/team.interface";
import React, { useState } from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";
import Announcement from "../../collaborations/announcements/Announcement";
import Resources from "../../collaborations/resources/Resources";
import Discussion from "../../collaborations/discussions/Discussion";

type Props = {
  team: ITeam;
  handleActive: (state: string) => void;
};

const Chat = ({ team, handleActive }: Props) => {
  const [activeChat, setActiveChat] = useState("Discussion");
  return (
    <div className="p-4">
      <div>
        <button
          onClick={() => handleActive("Team info")}
          className="flex text-xl items-center bg-gray-200 dark:bg-gray-600 px-4 py-2 gap-2 rounded-md mb-4 font-semibold"
        >
          <MdOutlineArrowBackIos />
          <small>Back</small>
        </button>
      </div>
      <div className="flex justify-between items-center gap-3">
        <p className="w-1/3">
          <button
            onClick={() => setActiveChat("Announcement")}
            className={`border w-full px-4 py-2 rounded-md ${
              activeChat === "Announcement" && "bg-gray-200 dark:bg-gray-600"
            }`}
          >
            Announcement
          </button>
        </p>
        <p className="w-1/3">
          <button
            onClick={() => setActiveChat("Resources")}
            className={`border w-full px-4 py-2 rounded-md  ${
              activeChat === "Resources" && "bg-gray-200 dark:bg-gray-600"
            }`}
          >
            Resources
          </button>
        </p>
        <p className="w-1/3">
          <button
            onClick={() => setActiveChat("Discussion")}
            className={`border w-full px-4 py-2 rounded-md   ${
              activeChat === "Discussion" && "bg-gray-200 dark:bg-gray-600"
            }`}
          >
            Discussion
          </button>
        </p>
      </div>
      <div>
        {activeChat === "Announcement" && <Announcement teamId={team?.id} />}
        {activeChat === "Resources" && <Resources teamId={team?.id} />}
        {activeChat === "Discussion" && <Discussion teamId={team?.id} />}
      </div>
    </div>
  );
};

export default Chat;
