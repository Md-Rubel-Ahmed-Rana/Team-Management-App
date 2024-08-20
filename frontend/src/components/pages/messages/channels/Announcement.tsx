import React, { useState } from "react";
import { useGetMessagesByTypeQuery } from "@/features/message";
import { ITeam } from "@/interfaces/team.interface";
import MessageContainer from "../MessageContainer";
import MessageForm from "../../teams/collaborations/common/MessageForm";

type Props = {
  team: ITeam;
};

const AnnouncementChannel = ({ team }: Props) => {
  const { data: messageData } = useGetMessagesByTypeQuery({
    type: "announcement",
    conversationId: team?.id,
  });
  return (
    <>
      <MessageContainer team={team} messages={messageData?.data} />
      <MessageForm teamId={team?.id} type={"announcement"} />
    </>
  );
};

export default AnnouncementChannel;
