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
exports.ProjectLeaveRequestService = void 0;
const projectLeaveRequest_model_1 = require("@/models/projectLeaveRequest.model");
const apiError_1 = __importDefault(require("@/shared/apiError"));
const http_status_1 = __importDefault(require("http-status"));
class Service {
    requestToLeave(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExist = yield projectLeaveRequest_model_1.ProjectLeaveRequest.findOne({
                project: data.project,
                member: data.member,
            });
            if (isExist) {
                throw new apiError_1.default(http_status_1.default.BAD_REQUEST, "You already have requested to leave");
            }
            const result = yield projectLeaveRequest_model_1.ProjectLeaveRequest.create(data);
            return result;
        });
    }
    getLeaveRequestByAdmin(admin) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield projectLeaveRequest_model_1.ProjectLeaveRequest.find({ admin, status: "pending" })
                .populate({
                path: "project",
                model: "Project",
                select: "name",
            })
                .populate({
                path: "member",
                model: "User",
                select: "name",
            });
            return result;
        });
    }
    ignoreRequest(requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield projectLeaveRequest_model_1.ProjectLeaveRequest.findByIdAndUpdate(requestId, { $set: { status: "ignored" } }, { new: true })
                .populate({
                path: "project",
                model: "Project",
                select: "name",
            })
                .populate({
                path: "member",
                model: "User",
                select: "name",
            });
            return result;
        });
    }
    getMemberRequest(memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield projectLeaveRequest_model_1.ProjectLeaveRequest.findOne({
                member: memberId,
                status: "pending",
            })
                .populate({
                path: "project",
                model: "Project",
                select: "name",
            })
                .populate({
                path: "member",
                model: "User",
                select: "name",
            });
            return result;
        });
    }
}
exports.ProjectLeaveRequestService = new Service();
