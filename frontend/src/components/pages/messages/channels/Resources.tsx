import React from "react";
import { useGetMessagesByTypeQuery } from "@/features/message";
import { ITeam } from "@/interfaces/team.interface";
import MessageContainer from "../MessageContainer";
import MessageForm from "../../teams/collaborations/common/MessageForm";

type Props = {
  team: ITeam;
};

const ResourcesChannel = ({ team }: Props) => {
  const { data: messageData } = useGetMessagesByTypeQuery({
    type: "resources",
    conversationId: team?.id,
  });
  return (
    <div>
      <MessageContainer team={team} messages={messageData?.data} />
      <MessageForm teamId={team?.id} type={"resources"} />
    </div>
  );
};

export default ResourcesChannel;
