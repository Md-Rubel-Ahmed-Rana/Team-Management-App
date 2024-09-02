import { HiPencilAlt } from "react-icons/hi";
import { FaTrashAlt } from "react-icons/fa";
import { useDeleteMessageMutation } from "@/features/message";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import MessageEdit from "./MessageEdit";
import { SocketContext } from "@/context/SocketContext";
import { useRouter } from "next/router";

type Props = {
  messageText: string;
  messageId: string;
};

const MessageActions = ({ messageId, messageText }: Props) => {
  const { socket }: any = useContext(SocketContext);
  const [isEditMessage, setIsEditMessage] = useState(false);
  const [deleteMessage] = useDeleteMessageMutation();
  const { query } = useRouter();

  const handleDeleteMessage = async () => {
    const result: any = await deleteMessage(messageId);
    if (result?.data?.success) {
      socket.emit("deleted-message", {
        receiverId: query?.participant || query?.teamId,
        messageId,
      });
      toast.success("Message deleted");
    }
    if (result?.error) {
      toast.error("Message was not deleted");
    }
  };

  return (
    <div className="flex gap-2 lg:gap-4">
      {messageText && (
        <HiPencilAlt
          onClick={() => setIsEditMessage(true)}
          className="text-lg lg:text-2xl text-blue-500 cursor-pointer"
        />
      )}

      <FaTrashAlt
        onClick={handleDeleteMessage}
        className="text-lg lg:text-2xl text-red-500 cursor-pointer"
      />
      {isEditMessage && (
        <MessageEdit
          isOpen={isEditMessage}
          setIsOpen={setIsEditMessage}
          messageId={messageId}
          messageText={messageText}
        />
      )}
    </div>
  );
};

export default MessageActions;
