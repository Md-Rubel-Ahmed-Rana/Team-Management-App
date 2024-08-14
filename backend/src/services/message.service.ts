import { IMessage } from "@/interfaces/message.interface";
import { Message } from "@/models/message.model";
import { mapper } from "../mapper";
import { MessageEntity } from "@/entities/message.entity";
import { ModelIdentifier } from "@automapper/core";
import { CreateMessageDTO } from "@/dto/message/create";
import { GetMessageDTO } from "@/dto/message/get";
import { UpdateMessageDTO } from "@/dto/message/update";
import { DeleteMessageDTO } from "@/dto/message/delete";

class Service {
  async createMessage(data: IMessage): Promise<CreateMessageDTO> {
    const result = await Message.create(data);
    const mappedData = mapper.map(
      result,
      MessageEntity as ModelIdentifier,
      CreateMessageDTO
    );
    return mappedData;
  }

  async getMessagesByType(
    messageType: string,
    conversationId: string
  ): Promise<GetMessageDTO[]> {
    const result = await Message.find({
      type: messageType,
      conversationId,
    }).populate({
      path: "poster",
      model: "User",
      select: ["name", "profile_picture"],
    });

    const mappedData = mapper.mapArray(
      result,
      MessageEntity as ModelIdentifier,
      GetMessageDTO
    );
    return mappedData;
  }

  async getMessage(messageId: string): Promise<GetMessageDTO> {
    const result = await Message.findById(messageId).populate({
      path: "poster",
      model: "User",
    });
    const mappedData = mapper.map(
      result,
      MessageEntity as ModelIdentifier,
      GetMessageDTO
    );
    return mappedData;
  }
  async getMessageById(messageId: string): Promise<IMessage | null> {
    return await Message.findById(messageId);
  }

  async updateMessage(
    messageId: string,
    text: string
  ): Promise<UpdateMessageDTO> {
    const result = await Message.findByIdAndUpdate(
      messageId,
      { $set: { text } },
      { new: true }
    );

    const mappedData = mapper.map(
      result,
      MessageEntity as ModelIdentifier,
      UpdateMessageDTO
    );
    return mappedData;
  }

  async deleteMessage(messageId: string): Promise<DeleteMessageDTO> {
    const result = await Message.findByIdAndDelete(messageId);
    const mappedData = mapper.map(
      result,
      MessageEntity as ModelIdentifier,
      DeleteMessageDTO
    );
    return mappedData;
  }
}

export const MessageService = new Service();
