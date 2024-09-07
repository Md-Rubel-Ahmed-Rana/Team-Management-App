import { IMessage } from "@/interfaces/message.interface";
import MessagePoster from "./MessagePoster";
import MessageActions from "./MessageActions";
import { detectLinks } from "@/utils/detectLinkFromText";
import MessageImages from "./MessageImages";
import MessageFiles from "./MessageFiles";
import { formattedDate } from "@/utils/formattedDate";
import { useLoggedInUserQuery } from "@/features/user";
import { IUser } from "@/interfaces/user.interface";
import { useRouter } from "next/router";
import { useGetSingleTeamQuery } from "@/features/team";

type Props = {
  message: IMessage;
};

const MessageCard = ({ message }: Props) => {
  const { query } = useRouter();
  const { data: userData } = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const { data: singleTeam } = useGetSingleTeamQuery(query?.teamId);
  const team = singleTeam?.data;
  return (
    <div key={message?.id} className="mx-auto border-b py-6">
      <div className="flex  justify-between items-start">
        <MessagePoster
          poster={message.poster}
          messageCreatedAt={message.createdAt}
        />
        {(user?.id === message?.poster?.id || user?.id === team?.admin?.id) && (
          <MessageActions messageId={message.id} messageText={message.text} />
        )}
      </div>
      {message?.text && (
        <div
          className="mb-3 text-gray-700"
          dangerouslySetInnerHTML={{
            __html: message?.text ? detectLinks(message?.text).join(" ") : "",
          }}
        />
      )}

      {message?.images?.length > 0 && (
        <MessageImages images={message?.images || []} />
      )}

      {message?.files?.length > 0 && (
        <MessageFiles files={message?.files || []} />
      )}
      <p className="mt-2 text-gray-400">{formattedDate(message.createdAt)}</p>
    </div>
  );
};

export default MessageCard;
