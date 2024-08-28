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
exports.NotificationController = void 0;
const notification_service_1 = require("@/services/notification.service");
const rootController_1 = __importDefault(require("@/shared/rootController"));
const http_status_1 = __importDefault(require("http-status"));
class Controller extends rootController_1.default {
    constructor() {
        super(...arguments);
        this.send = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield notification_service_1.NotificationService.createNotification(req.body);
            this.apiResponse(res, {
                statusCode: http_status_1.default.CREATED,
                success: true,
                message: "Notification sent successfully",
                data: result,
            });
        }));
        this.getNotificationsByReceiverId = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const receiverId = req.params.receiverId;
            const limit = ((_a = req.query) === null || _a === void 0 ? void 0 : _a.limit) ? Number((_b = req.query) === null || _b === void 0 ? void 0 : _b.limit) : 10;
            const result = yield notification_service_1.NotificationService.getNotificationsByReceiverId(receiverId, limit);
            this.apiResponse(res, {
                statusCode: http_status_1.default.OK,
                success: true,
                message: "Notifications fetched successfully",
                data: result,
            });
        }));
        this.getUnreadNotificationCount = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            const result = yield notification_service_1.NotificationService.getUnreadNotificationCount(userId);
            this.apiResponse(res, {
                statusCode: http_status_1.default.OK,
                success: true,
                message: "Total unread notifications",
                data: result,
            });
        }));
        this.markAllAsRead = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            const result = yield notification_service_1.NotificationService.markAllAsRead(userId);
            this.apiResponse(res, {
                statusCode: http_status_1.default.OK,
                success: true,
                message: "All marked as read",
                data: { readCount: result },
            });
        }));
        this.updateStatusToRead = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const result = yield notification_service_1.NotificationService.updateStatusToRead(id);
            this.apiResponse(res, {
                statusCode: http_status_1.default.OK,
                success: true,
                message: "Notification read successfully",
                data: result,
            });
        }));
    }
}
exports.NotificationController = new Controller();
