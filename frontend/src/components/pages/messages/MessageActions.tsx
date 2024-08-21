import { HiPencilAlt } from "react-icons/hi";
import { FaTrashAlt } from "react-icons/fa";
import { useDeleteMessageMutation } from "@/features/message";
import toast from "react-hot-toast";
import { useState } from "react";
import MessageEdit from "./MessageEdit";

type Props = {
  messageText: string;
  messageId: string;
};

const MessageActions = ({ messageId, messageText }: Props) => {
  const [isEditMessage, setIsEditMessage] = useState(false);
  const [deleteMessage] = useDeleteMessageMutation();

  const handleDeleteMessage = async () => {
    const result: any = await deleteMessage(messageId);
    if (result?.data?.success) {
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
