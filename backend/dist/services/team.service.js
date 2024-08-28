"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const mongoose_1 = __importStar(require("mongoose"));
const project_service_1 = require("./project.service");
const getCloudinaryFilePublicIdFromUrl_1 = __importDefault(require("@/utils/getCloudinaryFilePublicIdFromUrl"));
const deletePreviousFileFromCloudinary_1 = require("@/utils/deletePreviousFileFromCloudinary");
const propertySelections_1 = require("propertySelections");
const enums_1 = require("enums");
const envConfig_1 = require("@/configurations/envConfig");
const user_service_1 = require("./user.service");
class Service {
    createTeam(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExist = yield team_model_1.default.findOne({ name: data === null || data === void 0 ? void 0 : data.name });
            if (isExist) {
                throw new apiError_1.default(http_status_1.default.CONFLICT, "This team already exist");
            }
            else {
                const result = yield team_model_1.default.create(data);
                const populatedResult = yield result.populate([
                    {
                        path: "activeMembers",
                        model: "User",
                        select: propertySelections_1.UserSelect,
                    },
                    {
                        path: "pendingMembers",
                        model: "User",
                        select: propertySelections_1.UserSelect,
                    },
                    {
                        path: "admin",
                        model: "User",
                        select: propertySelections_1.UserSelect,
                    },
                ]);
                return populatedResult;
            }
        });
    }
    getMyTeamListForDropdown(adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield team_model_1.default.find({ admin: adminId }).select({ name: 1 });
            return result;
        });
    }
    getActiveMembers(teamId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield team_model_1.default.findById(teamId)
                .select({ activeMembers: 1, name: 1 })
                .populate([
                {
                    path: "activeMembers",
                    model: "User",
                    select: propertySelections_1.UserSelect,
                },
            ]);
            return result;
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
            const team = yield team_model_1.default.findById(teamId).populate([
                {
                    path: "activeMembers",
                    model: "User",
                    select: propertySelections_1.UserSelect,
                },
                {
                    path: "pendingMembers",
                    model: "User",
                    select: propertySelections_1.UserSelect,
                },
                {
                    path: "admin",
                    model: "User",
                    select: propertySelections_1.UserSelect,
                },
            ]);
            const projects = yield project_service_1.ProjectService.getProjectByTeamId(team === null || team === void 0 ? void 0 : team.id);
            const teamDetails = {
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
            return teamDetails;
        });
    }
    getTeamById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield team_model_1.default.findById(id).populate([
                {
                    path: "activeMembers",
                    model: "User",
                    select: propertySelections_1.UserSelect,
                },
                {
                    path: "pendingMembers",
                    model: "User",
                    select: propertySelections_1.UserSelect,
                },
                {
                    path: "admin",
                    model: "User",
                    select: propertySelections_1.UserSelect,
                },
            ]);
            return result;
        });
    }
    getTeam(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield team_model_1.default.findById(id).populate([
                {
                    path: "activeMembers",
                    model: "User",
                    select: propertySelections_1.UserSelect,
                },
                {
                    path: "pendingMembers",
                    model: "User",
                    select: propertySelections_1.UserSelect,
                },
                {
                    path: "admin",
                    model: "User",
                    select: propertySelections_1.UserSelect,
                },
            ]);
            return result;
        });
    }
    updateTeam(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExistTeam = yield team_model_1.default.findById(id);
            if (!isExistTeam) {
                throw new apiError_1.default(http_status_1.default.NOT_FOUND, "Team Not Found!");
            }
            const result = yield team_model_1.default.findByIdAndUpdate(id, { $set: Object.assign({}, data) }, { new: true }).populate([
                {
                    path: "activeMembers",
                    model: "User",
                    select: propertySelections_1.UserSelect,
                },
                {
                    path: "pendingMembers",
                    model: "User",
                    select: propertySelections_1.UserSelect,
                },
                {
                    path: "admin",
                    model: "User",
                    select: propertySelections_1.UserSelect,
                },
            ]);
            return result;
        });
    }
    deleteTeam(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield mongoose_1.default.startSession();
            session.startTransaction();
            try {
                const getTeam = yield team_model_1.default.findById(id);
                if (getTeam) {
                    const public_id = (0, getCloudinaryFilePublicIdFromUrl_1.default)(getTeam === null || getTeam === void 0 ? void 0 : getTeam.image);
                    if (public_id) {
                        yield (0, deletePreviousFileFromCloudinary_1.deleteSingleFileFromCloudinary)(public_id);
                    }
                }
                const result = yield team_model_1.default.findByIdAndDelete(id).session(session);
                if (!result) {
                    throw new apiError_1.default(http_status_1.default.NOT_FOUND, "Team Not Found!");
                }
                yield project_service_1.ProjectService.deleteProjectsByTeamId(id, session);
                yield session.commitTransaction();
                return result;
            }
            catch (error) {
                yield session.abortTransaction();
                throw new apiError_1.default(http_status_1.default.BAD_REQUEST, "Team was't not deleted");
            }
            finally {
                session.endSession();
            }
        });
    }
    removeMember(teamId, memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Remove member from team
            yield team_model_1.default.updateOne({ _id: teamId }, { $pull: { activeMembers: memberId } });
            const team = yield team_model_1.default.findById(teamId);
            // Remove this member from projects by member ID
            yield project_model_1.Project.updateMany({ team: teamId }, { $pull: { members: { memberId: memberId } } });
            // Update leave request for team
            yield teamLeaveRequest_model_1.TeamLeaveRequest.findOneAndUpdate({ team: teamId, member: memberId }, { $set: { status: "accepted" } });
            if (team && (team === null || team === void 0 ? void 0 : team.admin)) {
                const member = yield user_service_1.UserService.findUserById(memberId);
                const notifyObject = {
                    title: "You Have Been Removed from a Team",
                    type: enums_1.NotificationEnums.TEAM_MEMBER_REMOVED,
                    content: `Thank you for the time and effort you dedicated to the team "${team === null || team === void 0 ? void 0 : team.name}" in the "${team === null || team === void 0 ? void 0 : team.category}" category. Your contributions have been greatly appreciated. As we part ways, we wish you all the best in your future endeavors. If you have any questions or concerns, please feel free to reach out to the team admin.`,
                    receiver: memberId,
                    sender: team === null || team === void 0 ? void 0 : team.admin,
                    link: `${envConfig_1.config.app.frontendDomain}/teams/joined-teams?userId=${memberId}&name=${member === null || member === void 0 ? void 0 : member.name}&email=${member === null || member === void 0 ? void 0 : member.email}`,
                };
                yield notification_service_1.NotificationService.createNotification(notifyObject);
            }
        });
    }
}
exports.TeamService = new Service();
