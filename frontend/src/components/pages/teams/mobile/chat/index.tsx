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
    <div className="lg:p-4 px-4">
      <div>
        <button
          onClick={() => handleActive("Team info")}
          className="flex text-xl items-center bg-gray-200 dark:bg-gray-600 px-4 py-1 lg:py-2 gap-2 rounded-md mb-4 font-semibold"
        >
          <MdOutlineArrowBackIos />
          <small>Back</small>
        </button>
      </div>
      <select
        className="border-2 w-full border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500 flex-grow"
        name="category"
        id="category"
        onChange={(e: any) => setActiveChat(e.target.value)}
      >
        <option value="Announcement">Announcement</option>
        <option value="Resources">Resources</option>
        <option value="Discussion">Discussion</option>
      </select>
      <div>
        {activeChat === "Announcement" && <Announcement team={team} />}
        {activeChat === "Resources" && <Resources team={team} />}
        {activeChat === "Discussion" && <Discussion team={team} />}
      </div>
    </div>
  );
};

export default Chat;
