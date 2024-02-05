import React from "react";
import ShowMessages from "../common/ShowMessages";
import MessageForm from "../common/MessageForm";
import { useGetMessagesByTypeQuery } from "@/features/message";

type Props = {
  teamId: string;
};

const Resources = ({ teamId }: Props) => {
  const { data: messageData } = useGetMessagesByTypeQuery({
    type: "resources",
    conversationId: teamId,
  });
  return (
    <div>
      <ShowMessages messages={messageData?.data} />
      <MessageForm teamId={teamId} type={"resources"} />
    </div>
  );
};

export default Resources;
