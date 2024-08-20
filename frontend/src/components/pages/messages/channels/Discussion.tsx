import React from "react";
import { useGetMessagesByTypeQuery } from "@/features/message";
import { ITeam } from "@/interfaces/team.interface";
import MessageContainer from "../MessageContainer";
import MessageForm from "../../teams/collaborations/common/MessageForm";

type Props = {
  team: ITeam;
};
const DiscussionChannel = ({ team }: Props) => {
  const { data: messageData } = useGetMessagesByTypeQuery({
    type: "discussion",
    conversationId: team?.id,
  });
  return (
    <div className="flex-grow p-4 overflow-y-auto bg-white">
      <MessageContainer team={team} messages={messageData?.data} />
      <MessageForm teamId={team?.id} type={"discussion"} />
    </div>
  );
};

export default DiscussionChannel;
