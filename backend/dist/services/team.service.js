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
exports.TeamService = void 0;
const project_model_1 = require("@/models/project.model");
const team_model_1 = __importDefault(require("@/models/team.model"));
const teamLeaveRequest_model_1 = require("@/models/teamLeaveRequest.model");
const apiError_1 = __importDefault(require("@/shared/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const notification_service_1 = require("./notification.service");
const mapper_1 = require("../mapper");
const team_entity_1 = require("@/entities/team.entity");
const create_1 = require("@/dto/team/create");
const get_1 = require("@/dto/team/get");
const user_entity_1 = require("@/entities/user.entity");
const get_2 = require("@/dto/user/get");
const update_1 = require("@/dto/team/update");
const delete_1 = require("@/dto/team/delete");
const mongoose_1 = require("mongoose");
const project_service_1 = require("./project.service");
class Service {
    createTeam(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExist = yield team_model_1.default.findOne({ name: data === null || data === void 0 ? void 0 : data.name });
            if (isExist) {
                throw new apiError_1.default(http_status_1.default.CONFLICT, "This team already exist");
            }
            else {
                const result = yield team_model_1.default.create(data);
                const mappedData = mapper_1.mapper.map(result, team_entity_1.TeamEntity, create_1.CreateTeamDTO);
                return mappedData;
            }
        });
    }
    myTeams(adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield team_model_1.default.find({ admin: adminId }).populate([
                {
                    path: "activeMembers",
                    model: "User",
                },
                {
                    path: "pendingMembers",
                    model: "User",
                },
                {
                    path: "admin",
                    model: "User",
                },
            ]);
            const mappedData = mapper_1.mapper.mapArray(result, team_entity_1.TeamEntity, get_1.GetTeamDTO);
            return mappedData;
        });
    }
    joinedTeams(memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield team_model_1.default.find({ activeMembers: memberId }).populate([
                {
                    path: "activeMembers",
                    model: "User",
                },
                {
                    path: "pendingMembers",
                    model: "User",
                },
                {
                    path: "admin",
                    model: "User",
                },
            ]);
            const mappedData = mapper_1.mapper.mapArray(result, team_entity_1.TeamEntity, get_1.GetTeamDTO);
            return mappedData;
        });
    }
    getActiveMembers(teamId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield team_model_1.default.findById(teamId)
                .select({ activeMembers: 1 })
                .populate([
                {
                    path: "activeMembers",
                    model: "User",
                },
            ]);
            const members = result === null || result === void 0 ? void 0 : result.activeMembers;
            if (members && (members === null || members === void 0 ? void 0 : members.length) > 0) {
                const mappedData = mapper_1.mapper.mapArray(members, user_entity_1.UserEntity, get_2.GetUserDTO);
                return mappedData;
            }
        });
    }
    getMyTeamsForCard(adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            const objectIdAdmin = new mongoose_1.Types.ObjectId(adminId);
            const result = yield team_model_1.default.aggregate([
                {
                    $match: { admin: objectIdAdmin },
                },
                {
                    $addFields: {
                        activeMembers: { $size: "$activeMembers" },
                        pendingMembers: { $size: "$pendingMembers" },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        id: "$_id",
                        name: 1,
                        category: 1,
                        description: 1,
                        image: 1,
                        admin: 1,
                        activeMembers: 1,
                        pendingMembers: 1,
                        projects: 1,
                    },
                },
            ]);
            const promises = result.map((team) => __awaiter(this, void 0, void 0, function* () {
                const [projects] = yield Promise.all([
                    project_service_1.ProjectService.getProjectByTeamId(team === null || team === void 0 ? void 0 : team.id),
                ]);
                return {
                    id: team === null || team === void 0 ? void 0 : team.id,
                    name: team === null || team === void 0 ? void 0 : team.name,
                    category: team === null || team === void 0 ? void 0 : team.category,
                    description: team === null || team === void 0 ? void 0 : team.description,
                    image: team === null || team === void 0 ? void 0 : team.image,
                    admin: team === null || team === void 0 ? void 0 : team.admin,
                    activeMembers: team === null || team === void 0 ? void 0 : team.activeMembers,
                    pendingMembers: team === null || team === void 0 ? void 0 : team.pendingMembers,
                    projects: projects === null || projects === void 0 ? void 0 : projects.length,
                };
            }));
            const mappedResult = yield Promise.all(promises);
            return mappedResult;
        });
    }
    getJoinedTeamsForCard(memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            const objectIdMember = new mongoose_1.Types.ObjectId(memberId);
            const result = yield team_model_1.default.aggregate([
                {
                    $match: { activeMembers: objectIdMember },
                },
                {
                    $addFields: {
                        activeMembers: { $size: "$activeMembers" },
                        pendingMembers: { $size: "$pendingMembers" },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        id: "$_id",
                        name: 1,
                        category: 1,
                        description: 1,
                        image: 1,
                        admin: 1,
                        activeMembers: 1,
                        pendingMembers: 1,
                        projects: 1,
                    },
                },
            ]);
            const promises = result.map((team) => __awaiter(this, void 0, void 0, function* () {
                const [projects] = yield Promise.all([
                    project_service_1.ProjectService.getProjectByTeamId(team === null || team === void 0 ? void 0 : team.id),
                ]);
                return {
                    id: team === null || team === void 0 ? void 0 : team.id,
                    name: team === null || team === void 0 ? void 0 : team.name,
                    category: team === null || team === void 0 ? void 0 : team.category,
                    description: team === null || team === void 0 ? void 0 : team.description,
                    image: team === null || team === void 0 ? void 0 : team.image,
                    admin: team === null || team === void 0 ? void 0 : team.admin,
                    activeMembers: team === null || team === void 0 ? void 0 : team.activeMembers,
                    pendingMembers: team === null || team === void 0 ? void 0 : team.pendingMembers,
                    projects: projects === null || projects === void 0 ? void 0 : projects.length,
                };
            }));
            const mappedResult = yield Promise.all(promises);
            return mappedResult;
        });
    }
    getSingleTeamWithDetails(teamId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userProjection = {
                name: 1,
                profile_picture: 1,
                email: 1,
            };
            const team = yield team_model_1.default.findById(teamId).populate([
                {
                    path: "activeMembers",
                    model: "User",
                    select: userProjection,
                },
                {
                    path: "pendingMembers",
                    model: "User",
                    select: userProjection,
                },
                {
                    path: "admin",
                    model: "User",
                    select: userProjection,
                },
            ]);
            const projects = yield project_service_1.ProjectService.getProjectByTeamId(team === null || team === void 0 ? void 0 : team.id);
            return {
                id: team === null || team === void 0 ? void 0 : team.id,
                name: team === null || team === void 0 ? void 0 : team.name,
                category: team === null || team === void 0 ? void 0 : team.category,
                description: team === null || team === void 0 ? void 0 : team.description,
                image: team === null || team === void 0 ? void 0 : team.image,
                admin: team === null || team === void 0 ? void 0 : team.admin,
                activeMembers: team === null || team === void 0 ? void 0 : team.activeMembers,
                pendingMembers: team === null || team === void 0 ? void 0 : team.pendingMembers,
                projects: projects,
            };
        });
    }
    getTeamById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield team_model_1.default.findById(id);
            if (!result) {
                throw new apiError_1.default(404, "Team not found!");
            }
            return result;
        });
    }
    getTeam(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield team_model_1.default.findById(id).populate([
                {
                    path: "activeMembers",
                    model: "User",
                },
                {
                    path: "pendingMembers",
                    model: "User",
                },
                {
                    path: "admin",
                    model: "User",
                },
            ]);
            if (!result) {
                throw new apiError_1.default(404, "Team not found!");
            }
            const mappedData = mapper_1.mapper.map(result, team_entity_1.TeamEntity, get_1.GetTeamDTO);
            return mappedData;
        });
    }
    updateTeam(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(id, data);
            const isExistTeam = yield team_model_1.default.findById(id);
            if (!isExistTeam) {
                throw new apiError_1.default(http_status_1.default.NOT_FOUND, "Team Not Found!");
            }
            const result = yield team_model_1.default.findByIdAndUpdate(id, { $set: Object.assign({}, data) }, { new: true }).populate([
                {
                    path: "activeMembers",
                    model: "User",
                },
                {
                    path: "pendingMembers",
                    model: "User",
                },
                {
                    path: "admin",
                    model: "User",
                },
            ]);
            const mappedData = mapper_1.mapper.map(result, team_entity_1.TeamEntity, update_1.UpdateTeamDTO);
            return mappedData;
        });
    }
    deleteTeam(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield team_model_1.default.findByIdAndDelete(id);
            if (!result) {
                throw new apiError_1.default(http_status_1.default.NOT_FOUND, "Team Not Found!");
            }
            const mappedData = mapper_1.mapper.map(result, team_entity_1.TeamEntity, delete_1.DeleteTeamDTO);
            return mappedData;
        });
    }
    removeMember(teamId, memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            // remove from team
            yield team_model_1.default.updateOne({ _id: teamId }, { $pull: { activeMembers: memberId } });
            const result = yield team_model_1.default.findById(teamId).select({ name: 1, admin: 1 });
            // remove this member from projects by member id //
            yield project_model_1.Project.updateMany({ team: teamId }, { $pull: { members: { memberId: memberId } } });
            // update leave request for team
            yield teamLeaveRequest_model_1.TeamLeaveRequest.findOneAndUpdate({ team: teamId }, { $set: { status: "accepted" } }).sort({ createdAt: -1 });
            if (result && (result === null || result === void 0 ? void 0 : result.admin)) {
                yield notification_service_1.NotificationService.sendNotification(result === null || result === void 0 ? void 0 : result.admin, memberId, "team_invitation", "Team Removal", `You've been removed from Team (${result === null || result === void 0 ? void 0 : result.name})`, `dashboard?uId=${memberId}activeView=joined-teams`);
            }
        });
    }
}
exports.TeamService = new Service();
