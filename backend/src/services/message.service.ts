import {
  IMessage,
  IMessagePayloadForSocket,
} from "@/interfaces/message.interface";
import { IGetUser } from "@/interfaces/user.interface";
import { Message } from "@/models/message.model";
import { Types } from "mongoose";
import { UserSelect } from "propertySelections";

export class Service {
  async createMessage(data: IMessage): Promise<IMessagePayloadForSocket> {
    const result = await Message.create(data);
    const populatedResult: any = await result.populate({
      path: "poster",
      model: "User",
      select: UserSelect,
    });
    const {
      _id: msId,
      conversationId,
      text,
      type,
      images,
      files,
      createdAt,
      poster: { _id: userId, name, profile_picture },
    } = populatedResult;
    const emitData: IMessagePayloadForSocket = {
      id: msId,
      conversationId: conversationId,
      text: text,
      type: type,
      poster: {
        id: userId,
        name: name,
        profile_picture: profile_picture,
      },
      files: files,
      images: images,
      createdAt: createdAt,
    };
    return emitData;
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

  async getDistinctUserIds(
    objectId: Types.ObjectId,
    userId: string
  ): Promise<{ userId: string }[]> {
    const distinctUserIds = await Message.aggregate([
      {
        $match: {
          $or: [
            { poster: objectId },
            {
              conversationId: {
                $regex: new RegExp(`^(${userId}&|${userId}$)`),
              },
            },
          ],
        },
      },
      {
        $group: {
          _id: null,
          uniqueUsers: {
            $addToSet: {
              $cond: [
                { $eq: ["$poster", objectId] },
                {
                  $cond: [
                    {
                      $eq: [
                        {
                          $arrayElemAt: [
                            { $split: ["$conversationId", "&"] },
                            0,
                          ],
                        },
                        userId,
                      ],
                    },
                    {
                      $arrayElemAt: [{ $split: ["$conversationId", "&"] }, 1],
                    },
                    {
                      $arrayElemAt: [{ $split: ["$conversationId", "&"] }, 0],
                    },
                  ],
                },
                "$poster",
              ],
            },
          },
        },
      },
      {
        $unwind: "$uniqueUsers",
      },
      {
        $project: {
          userId: "$uniqueUsers",
        },
      },
    ]);

    return distinctUserIds;
  }

  async getLastMessage(
    objectId: Types.ObjectId,
    userId: string,
    user: IGetUser
  ) {
    const lastMessages = await Message.findOne({
      $or: [
        {
          $and: [
            { poster: objectId },
            {
              conversationId: {
                $regex: `^${user?.id.toString()}&${userId}|${userId}&${user?.id.toString()}$`,
              },
            },
          ],
        },
        {
          $and: [
            { poster: user?.id },
            {
              conversationId: {
                $regex: `^${userId}&${user?.id.toString()}|${user?.id.toString()}&${userId}$`,
              },
            },
          ],
        },
      ],
    }).sort({ createdAt: -1 });
  }

  async getOneToOneMessagesWithType(conversationId: string) {
    const ids = conversationId.split("&");
    const result = await Message.find({
      $or: [
        { conversationId: `${ids[0]}&${ids[1]}` },
        { conversationId: `${ids[1]}&${ids[0]}` },
      ],
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

  async updateMessage(
    messageId: string,
    text: string
  ): Promise<IMessagePayloadForSocket> {
    const result: any = await Message.findByIdAndUpdate(
      messageId,
      { $set: { text } },
      { new: true }
    ).populate({
      path: "poster",
      model: "User",
      select: UserSelect,
    });

    const updatedMessage: IMessagePayloadForSocket = {
      id: result?.id,
      conversationId: result?.conversationId,
      type: result?.type,
      text: result?.text,
      files: result?.files,
      images: result.images,
      createdAt: result?.createdAt,
      poster: {
        id: result?.poster?.id,
        name: result?.poster?.name,
        profile_picture: result?.poster?.profile_picture,
      },
    };

    return updatedMessage;
  }

  async deleteMessage(messageId: string): Promise<any> {
    const result = await Message.findByIdAndDelete(messageId);
    return result;
  }
}

export const MessageService = new Service();
