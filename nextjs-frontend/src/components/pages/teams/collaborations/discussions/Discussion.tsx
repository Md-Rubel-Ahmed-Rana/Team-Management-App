import React from "react";
import ShowMessages, { Post } from "../common/ShowMessages";
import MessageForm from "../common/MessageForm";
import { useGetMessagesByTypeQuery } from "@/features/message";

type Props = {
  teamId: string;
};
const Discussion = ({ teamId }: Props) => {
  const { data: messageData } = useGetMessagesByTypeQuery({
    type: "discussion",
    conversationId: teamId,
  });
  return (
    <div>
      <ShowMessages messages={messageData?.data} />
      <MessageForm teamId={teamId} type={"discussion"} />
    </div>
  );
};

export default Discussion;
