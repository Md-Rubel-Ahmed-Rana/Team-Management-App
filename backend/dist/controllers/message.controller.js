"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageController = void 0;
const message_service_1 = require("@/services/message.service");
const rootController_1 = __importDefault(require("@/shared/rootController"));
const deleteMessageFilesFromCloudinary_1 = __importDefault(require("@/utils/deleteMessageFilesFromCloudinary"));
const http_status_1 = __importDefault(require("http-status"));
class Controller extends rootController_1.default {
    constructor() {
        super(...arguments);
        this.createMessage = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const message = yield message_service_1.MessageService.createMessage(req.body);
            this.apiResponse(res, {
                statusCode: http_status_1.default.CREATED,
                success: true,
                message: "Message created successfully",
                data: message,
            });
        }));
        this.getMessagesByType = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const messageType = req.params.type;
            const conversationId = req.params.conversationId;
            const messages = yield message_service_1.MessageService.getMessagesByType(messageType, conversationId);
            this.apiResponse(res, {
                statusCode: http_status_1.default.OK,
                success: true,
                message: "Messages found",
                data: messages,
            });
        }));
        this.getMessage = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const messageId = req.params.id;
            const message = yield message_service_1.MessageService.getMessage(messageId);
            this.apiResponse(res, {
                statusCode: http_status_1.default.OK,
                success: true,
                message: "Message found",
                data: message,
            });
        }));
        this.getMessageById = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const messageId = req.params.id;
            const message = yield message_service_1.MessageService.getMessageById(messageId);
            this.apiResponse(res, {
                statusCode: http_status_1.default.OK,
                success: true,
                message: "Message found",
                data: message,
            });
        }));
        this.updateMessage = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { text } = req.body;
            const result = yield message_service_1.MessageService.updateMessage(id, text);
            this.apiResponse(res, {
                statusCode: http_status_1.default.OK,
                success: true,
                message: "Message text updated successfully",
                data: result,
            });
        }));
        this.deleteMessage = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const messageId = req.params.id;
            yield (0, deleteMessageFilesFromCloudinary_1.default)(messageId);
            const result = yield message_service_1.MessageService.deleteMessage(messageId);
            this.apiResponse(res, {
                statusCode: http_status_1.default.OK,
                success: true,
                message: "Message deleted successfully",
                data: result,
            });
        }));
    }
}
exports.MessageController = new Controller();
