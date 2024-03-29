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
exports.TeamLeaveRequestController = void 0;
const teamLeaveRequest_service_1 = require("@/services/teamLeaveRequest.service");
const rootController_1 = __importDefault(require("@/shared/rootController"));
const http_status_1 = __importDefault(require("http-status"));
class Controller extends rootController_1.default {
    constructor() {
        super(...arguments);
        this.requestToLeave = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield teamLeaveRequest_service_1.TeamLeaveRequestService.requestToLeave(req.body);
            this.apiResponse(res, {
                statusCode: http_status_1.default.CREATED,
                success: true,
                message: "Your leave request has been sent to admin",
                data: result,
            });
        }));
        this.getLeaveRequestByAdmin = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield teamLeaveRequest_service_1.TeamLeaveRequestService.getLeaveRequestByAdmin(req.params.adminId);
            this.apiResponse(res, {
                statusCode: http_status_1.default.CREATED,
                success: true,
                message: "Leave requests found",
                data: result,
            });
        }));
        this.ignoreRequest = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const requestId = req.params.requestId;
            const result = yield teamLeaveRequest_service_1.TeamLeaveRequestService.ignoreRequest(requestId);
            this.apiResponse(res, {
                statusCode: http_status_1.default.OK,
                success: true,
                message: "Leave request ignored",
                data: result,
            });
        }));
        this.getMemberRequest = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const memberId = req.params.memberId;
            const result = yield teamLeaveRequest_service_1.TeamLeaveRequestService.getMemberRequest(memberId);
            this.apiResponse(res, {
                statusCode: http_status_1.default.OK,
                success: true,
                message: "Leave requests found",
                data: result,
            });
        }));
    }
}
exports.TeamLeaveRequestController = new Controller();
