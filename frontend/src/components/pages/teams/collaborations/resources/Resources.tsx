import React from "react";
import ShowMessages from "../common/ShowMessages";
import MessageForm from "../common/MessageForm";
import { useGetMessagesByTypeQuery } from "@/features/message";
import { ITeam } from "@/interfaces/team.interface";

type Props = {
  team: ITeam;
};

const Resources = ({ team }: Props) => {
  const { data: messageData } = useGetMessagesByTypeQuery({
    type: "resources",
    conversationId: team?.id,
  });
  return (
    <div>
      <ShowMessages team={team} messages={messageData?.data} />
      <MessageForm teamId={team?.id} type={"resources"} />
    </div>
  );
};

export default Resources;
