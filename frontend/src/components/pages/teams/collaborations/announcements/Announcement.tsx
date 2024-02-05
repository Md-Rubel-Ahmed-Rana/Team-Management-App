import React, { useState } from "react";
import ShowMessages from "../common/ShowMessages";
import MessageForm from "../common/MessageForm";
import { useGetMessagesByTypeQuery } from "@/features/message";

type Props = {
  teamId: string;
};

const Announcement = ({ teamId }: Props) => {
  const { data: messageData } = useGetMessagesByTypeQuery({
    type: "announcement",
    conversationId: teamId,
  });
  return (
    <div>
      <ShowMessages messages={messageData?.data} />
      <MessageForm teamId={teamId} type={"announcement"} />
    </div>
  );
};

export default Announcement;
