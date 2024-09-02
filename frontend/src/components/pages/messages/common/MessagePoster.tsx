import { IMessagePoster } from "@/interfaces/message.interface";
import moment from "moment";
import Link from "next/link";

type Props = {
  poster: IMessagePoster;
  messageCreatedAt: Date;
};

const MessagePoster = ({ poster, messageCreatedAt }: Props) => {
  return (
    <div className="flex items-center mb-4">
      <Link
        href={`/messages/chats/${poster?.id}?participantId=${poster?.id}&name=${poster?.name}&email=${poster?.email}&profile_picture=${poster?.profile_picture}`}
      >
        <img
          src={poster?.profile_picture}
          alt={poster?.name}
          className="w-12 h-12 rounded-full mr-4"
        />
      </Link>
      <div className="flex flex-col gap-1">
        <span className="font-bold text-xs lg:text-lg text-gray-700">
          {poster?.name}
        </span>
        <span className="text-sm text-gray-500">
          {moment(messageCreatedAt).fromNow()}
        </span>
      </div>
    </div>
  );
};

export default MessagePoster;
