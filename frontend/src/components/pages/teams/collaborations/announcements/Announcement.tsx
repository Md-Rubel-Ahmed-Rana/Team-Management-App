import React, { useState } from "react";
import ShowMessages from "../common/ShowMessages";
import MessageForm from "../common/MessageForm";
import { useGetMessagesByTypeQuery } from "@/features/message";
import { ITeam } from "@/interfaces/team.interface";

type Props = {
  team: ITeam;
};

const Announcement = ({ team }: Props) => {
  const { data: messageData } = useGetMessagesByTypeQuery({
    type: "announcement",
    conversationId: team?.id,
  });
  return (
    <div>
      <ShowMessages team={team} messages={messageData?.data} />
      <MessageForm teamId={team?.id} type={"announcement"} />
    </div>
  );
};

export default Announcement;
