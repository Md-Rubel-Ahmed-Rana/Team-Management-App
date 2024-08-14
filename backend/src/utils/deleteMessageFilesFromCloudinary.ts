import { MessageService } from "@/services/message.service";
import { deleteMultipleFileFromCloudinary } from "./deletePreviousFileFromCloudinary";
import extractCloudinaryPublicId from "./getCloudinaryFilePublicIdFromUrl";

const deleteMessageFilesFromCloudinary = async (messageId: string) => {
  const message = await MessageService.getMessageById(messageId);
  const publicIds: { public_id: string }[] = [];
  if (message?.images && message?.images?.length > 0) {
    message?.images.forEach((imageUrl) => {
      const public_id = extractCloudinaryPublicId(imageUrl);
      const newId = { public_id: public_id };
      publicIds.push(newId);
    });
  }
  if (message?.files && message?.files?.length > 0) {
    message?.files.forEach((fileUrl) => {
      const public_id = extractCloudinaryPublicId(fileUrl);
      const newId = { public_id: public_id };
      publicIds.push(newId);
    });
  }

  if (publicIds.length > 0) {
    const result = await deleteMultipleFileFromCloudinary(publicIds);
    console.log("Deleted files from message", result);
  } else {
    console.log("Files from message were not found to delete", publicIds);
  }
};

export default deleteMessageFilesFromCloudinary;
