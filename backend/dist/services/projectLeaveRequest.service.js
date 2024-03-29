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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectLeaveRequestService = void 0;
const projectLeaveRequest_model_1 = require("@/models/projectLeaveRequest.model");
const mapper_1 = require("../mapper");
const create_1 = require("@/dto/projectLeave/create");
const projectLeave_entity_1 = require("@/entities/projectLeave.entity");
const get_1 = require("@/dto/projectLeave/get");
const update_1 = require("@/dto/projectLeave/update");
class Service {
    requestToLeave(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield projectLeaveRequest_model_1.ProjectLeaveRequest.create(data);
            const mappedData = mapper_1.mapper.map(result, projectLeave_entity_1.ProjectLeaveEntity, create_1.CreateProjectLeaveDTO);
            return mappedData;
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
            const mappedData = mapper_1.mapper.mapArray(result, projectLeave_entity_1.ProjectLeaveEntity, get_1.GetProjectLeaveDTO);
            return mappedData;
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
            const mappedData = mapper_1.mapper.map(result, projectLeave_entity_1.ProjectLeaveEntity, update_1.UpdateProjectLeaveDTO);
            return mappedData;
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
            const mappedData = mapper_1.mapper.map(result, projectLeave_entity_1.ProjectLeaveEntity, get_1.GetProjectLeaveDTO);
            return mappedData;
        });
    }
}
exports.ProjectLeaveRequestService = new Service();
