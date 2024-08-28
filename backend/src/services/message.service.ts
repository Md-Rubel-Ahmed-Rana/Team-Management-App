import { IMessage } from "@/interfaces/message.interface";
import { Message } from "@/models/message.model";
import { UserSelect } from "propertySelections";

class Service {
  async createMessage(data: IMessage): Promise<any> {
    const result = await Message.create(data);
    const populatedResult = await result.populate({
      path: "poster",
      model: "User",
      select: UserSelect,
    });

    return populatedResult;
  }

  async getMessagesByType(
    messageType: string,
    conversationId: string
  ): Promise<any> {
    const result = await Message.find({
      type: messageType,
      conversationId,
    }).populate({
      path: "poster",
      model: "User",
      select: UserSelect,
    });

    return result;
  }

  async getMessage(messageId: string): Promise<any> {
    const result = await Message.findById(messageId).populate({
      path: "poster",
      model: "User",
      select: UserSelect,
    });

    return result;
  }
  async getMessageById(messageId: string): Promise<IMessage | null> {
    return await Message.findById(messageId).populate({
      path: "poster",
      model: "User",
      select: UserSelect,
    });
  }

  async updateMessage(messageId: string, text: string): Promise<any> {
    const result = await Message.findByIdAndUpdate(
      messageId,
      { $set: { text } },
      { new: true }
    ).populate({
      path: "poster",
      model: "User",
      select: UserSelect,
    });

    return result;
  }

  async deleteMessage(messageId: string): Promise<any> {
    const result = await Message.findByIdAndDelete(messageId);
    return result;
  }
}

export const MessageService = new Service();
