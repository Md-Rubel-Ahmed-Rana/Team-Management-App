import { MessageService } from "@/services/message.service";
import RootController from "@/shared/rootController";
import deleteMessageFilesFromCloudinary from "@/utils/deleteMessageFilesFromCloudinary";
import { Request, Response } from "express";
import httpStatus from "http-status";

class Controller extends RootController {
  createMessage = this.catchAsync(async (req: Request, res: Response) => {
    const result = await MessageService.createMessage(req.body);
    this.apiResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Message created successfully",
      data: result,
    });
  });

  getMessagesByType = this.catchAsync(async (req: Request, res: Response) => {
    const messageType = req.params.type;
    const conversationId = req.params.conversationId;
    const messages = await MessageService.getMessagesByType(
      messageType,
      conversationId
    );
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Messages found",
      data: messages,
    });
  });

  getMessage = this.catchAsync(async (req: Request, res: Response) => {
    const messageId = req.params.id;
    const message = await MessageService.getMessage(messageId);
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Message found",
      data: message,
    });
  });

  getMessageById = this.catchAsync(async (req: Request, res: Response) => {
    const messageId = req.params.id;
    const message = await MessageService.getMessageById(messageId);
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Message found",
      data: message,
    });
  });

  updateMessage = this.catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { text } = req.body;
    const result = await MessageService.updateMessage(id, text);
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Message text updated successfully",
      data: result,
    });
  });

  deleteMessage = this.catchAsync(async (req: Request, res: Response) => {
    const messageId = req.params.id;
    await deleteMessageFilesFromCloudinary(messageId);
    const result = await MessageService.deleteMessage(messageId);
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Message deleted successfully",
      data: result,
    });
  });
}

export const MessageController = new Controller();
