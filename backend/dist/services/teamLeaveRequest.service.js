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
exports.TeamLeaveRequestService = void 0;
const teamLeaveRequest_model_1 = require("@/models/teamLeaveRequest.model");
const mapper_1 = require("../mapper");
const teamLeave_entity_1 = require("@/entities/teamLeave.entity");
const create_1 = require("@/dto/teamLeave/create");
const get_1 = require("@/dto/teamLeave/get");
const update_1 = require("@/dto/teamLeave/update");
class Service {
    requestToLeave(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield teamLeaveRequest_model_1.TeamLeaveRequest.create(data);
            const mappedData = mapper_1.mapper.map(result, teamLeave_entity_1.TeamLeaveEntity, create_1.CreateTeamLeaveDTO);
            return mappedData;
        });
    }
    getLeaveRequestByAdmin(admin) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield teamLeaveRequest_model_1.TeamLeaveRequest.find({ admin, status: "pending" })
                .populate({
                path: "team",
                model: "Team",
                select: "name",
            })
                .populate({
                path: "member",
                model: "User",
                select: "name",
            });
            const mappedData = mapper_1.mapper.mapArray(result, teamLeave_entity_1.TeamLeaveEntity, get_1.GetTeamLeaveDTO);
            return mappedData;
        });
    }
    ignoreRequest(requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield teamLeaveRequest_model_1.TeamLeaveRequest.findByIdAndUpdate(requestId, { $set: { status: "ignored" } }, { new: true });
            const mappedData = mapper_1.mapper.map(result, teamLeave_entity_1.TeamLeaveEntity, update_1.UpdateTeamLeaveDTO);
            return mappedData;
        });
    }
    getMemberRequest(memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield teamLeaveRequest_model_1.TeamLeaveRequest.find({
                member: memberId,
                status: "pending",
            })
                .populate({
                path: "team",
                model: "Team",
                select: "name",
            })
                .populate({
                path: "member",
                model: "User",
                select: "name",
            });
            const mappedData = mapper_1.mapper.mapArray(result, teamLeave_entity_1.TeamLeaveEntity, get_1.GetTeamLeaveDTO);
            return mappedData;
        });
    }
}
exports.TeamLeaveRequestService = new Service();
