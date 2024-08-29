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
exports.ProjectLeaveRequestController = void 0;
const projectLeaveRequest_service_1 = require("@/services/projectLeaveRequest.service");
const rootController_1 = __importDefault(require("@/shared/rootController"));
const http_status_1 = __importDefault(require("http-status"));
class Controller extends rootController_1.default {
    constructor() {
        super(...arguments);
        this.requestToLeave = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            yield projectLeaveRequest_service_1.ProjectLeaveRequestService.requestToLeave(req.body);
            this.apiResponse(res, {
                statusCode: http_status_1.default.CREATED,
                success: true,
                message: "Your leave request has been sent to admin",
                data: null,
            });
        }));
        this.getLeaveRequestByAdmin = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield projectLeaveRequest_service_1.ProjectLeaveRequestService.getLeaveRequestByAdmin(req.params.adminId);
            this.apiResponse(res, {
                statusCode: http_status_1.default.OK,
                success: true,
                message: "Leave requests found",
                data: result,
            });
        }));
        this.ignoreRequest = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const requestId = req.params.requestId;
            yield projectLeaveRequest_service_1.ProjectLeaveRequestService.ignoreRequest(requestId);
            this.apiResponse(res, {
                statusCode: http_status_1.default.OK,
                success: true,
                message: "Leave request ignored",
                data: null,
            });
        }));
        this.acceptLeaveRequest = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const projectId = req.params.projectId;
            const memberId = req.params.memberId;
            yield projectLeaveRequest_service_1.ProjectLeaveRequestService.acceptLeaveRequest(projectId, memberId);
            this.apiResponse(res, {
                statusCode: http_status_1.default.OK,
                success: true,
                message: "Leave request accepted",
                data: null,
            });
        }));
        this.getMemberRequest = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const memberId = req.params.memberId;
            const result = yield projectLeaveRequest_service_1.ProjectLeaveRequestService.getMemberRequest(memberId);
            this.apiResponse(res, {
                statusCode: http_status_1.default.OK,
                success: true,
                message: "Request found",
                data: result,
            });
        }));
    }
}
exports.ProjectLeaveRequestController = new Controller();
