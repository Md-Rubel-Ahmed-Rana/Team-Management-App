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
const apiError_1 = __importDefault(require("@/shared/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const notification_service_1 = require("./notification.service");
const mongoose_1 = __importDefault(require("mongoose"));
const project_service_1 = require("./project.service");
const getCloudinaryFilePublicIdFromUrl_1 = __importDefault(require("@/utils/getCloudinaryFilePublicIdFromUrl"));
const deletePreviousFileFromCloudinary_1 = require("@/utils/deletePreviousFileFromCloudinary");
const propertySelections_1 = require("propertySelections");
const enums_1 = require("enums");
const envConfig_1 = require("@/configurations/envConfig");
const user_service_1 = require("./user.service");
class Service {
    // Temporarily using as alternative of DTO
    userSanitizer(user) {
        return {
            id: String(user === null || user === void 0 ? void 0 : user._id),
            name: user === null || user === void 0 ? void 0 : user.name,
            email: user === null || user === void 0 ? void 0 : user.email,
            department: (user === null || user === void 0 ? void 0 : user.department) || "",
            designation: (user === null || user === void 0 ? void 0 : user.designation) || "",
            phoneNumber: (user === null || user === void 0 ? void 0 : user.phoneNumber) || "",
            profile_picture: (user === null || user === void 0 ? void 0 : user.profile_picture) || "",
            presentAddress: (user === null || user === void 0 ? void 0 : user.presentAddress) || "",
            permanentAddress: (user === null || user === void 0 ? void 0 : user.permanentAddress) || "",
            country: (user === null || user === void 0 ? void 0 : user.country) || "",
            createdAt: user === null || user === void 0 ? void 0 : user.createdAt,
            updatedAt: user === null || user === void 0 ? void 0 : user.updatedAt,
        };
    }
    projectSanitizer(project) {
        var _a, _b;
        const members = (_a = project === null || project === void 0 ? void 0 : project.members) === null || _a === void 0 ? void 0 : _a.map((user) => this.userSanitizer(user));
        const leaveRequests = (_b = project === null || project === void 0 ? void 0 : project.leaveRequests) === null || _b === void 0 ? void 0 : _b.map((user) => this.userSanitizer(user));
        return {
            id: String(project === null || project === void 0 ? void 0 : project._id),
            team: project === null || project === void 0 ? void 0 : project.team,
            user: project === null || project === void 0 ? void 0 : project.user,
            name: project === null || project === void 0 ? void 0 : project.name,
            category: project === null || project === void 0 ? void 0 : project.category,
            members: members,
            leaveRequests: leaveRequests,
            tasks: (project === null || project === void 0 ? void 0 : project.tasks) || 0,
            createdAt: project === null || project === void 0 ? void 0 : project.createdAt,
            updatedAt: project === null || project === void 0 ? void 0 : project.updatedAt,
        };
    }
    teamSanitizer(team) {
        var _a, _b, _c, _d;
        const admin = this.userSanitizer(team === null || team === void 0 ? void 0 : team.admin);
        const projects = (_a = team.projects) === null || _a === void 0 ? void 0 : _a.map((project) => this.projectSanitizer(project));
        const leaveRequests = (_b = team === null || team === void 0 ? void 0 : team.leaveRequests) === null || _b === void 0 ? void 0 : _b.map((user) => this.userSanitizer(user));
        const activeMembers = (_c = team === null || team === void 0 ? void 0 : team.activeMembers) === null || _c === void 0 ? void 0 : _c.map((user) => this.userSanitizer(user));
        const pendingMembers = (_d = team === null || team === void 0 ? void 0 : team.pendingMembers) === null || _d === void 0 ? void 0 : _d.map((user) => this.userSanitizer(user));
        return {
            id: String(team === null || team === void 0 ? void 0 : team._id),
            name: team === null || team === void 0 ? void 0 : team.name,
            category: team === null || team === void 0 ? void 0 : team.category,
            description: team === null || team === void 0 ? void 0 : team.description,
            image: (team === null || team === void 0 ? void 0 : team.image) || "",
            admin: admin,
            projects: projects,
            leaveRequests: leaveRequests,
            activeMembers: activeMembers,
            pendingMembers: pendingMembers,
            createdAt: team === null || team === void 0 ? void 0 : team.createdAt,
            updatedAt: team === null || team === void 0 ? void 0 : team.updatedAt,
        };
    }
    createTeam(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExist = yield team_model_1.default.findOne({ name: data === null || data === void 0 ? void 0 : data.name });
            if (isExist) {
                throw new apiError_1.default(http_status_1.default.CONFLICT, "This team name is already exist");
            }
        });
    }
    getSingleTeam(id) {
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
                {
                    path: "leaveRequests",
                    model: "User",
                    select: propertySelections_1.UserSelect,
                },
                {
                    path: "projects",
                    model: "Project",
                },
            ]);
            const dtoData = this.teamSanitizer(result);
            return dtoData;
        });
    }
    getAllTeams() {
        return __awaiter(this, void 0, void 0, function* () {
            const teams = yield team_model_1.default.find({}).populate([
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
                {
                    path: "leaveRequests",
                    model: "User",
                    select: propertySelections_1.UserSelect,
                },
                {
                    path: "projects",
                    model: "Project",
                },
            ]);
            const dtoData = teams === null || teams === void 0 ? void 0 : teams.map((team) => this.teamSanitizer(team));
            return dtoData;
        });
    }
    getMyTeams(adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            const teams = yield team_model_1.default.find({ admin: adminId }).populate([
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
                {
                    path: "leaveRequests",
                    model: "User",
                    select: propertySelections_1.UserSelect,
                },
                {
                    path: "projects",
                    model: "Project",
                },
            ]);
            const dtoData = teams === null || teams === void 0 ? void 0 : teams.map((team) => this.teamSanitizer(team));
            return dtoData;
        });
    }
    getJoinedTeams(memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            const teams = yield team_model_1.default.find({ activeMembers: memberId }).populate([
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
                {
                    path: "leaveRequests",
                    model: "User",
                    select: propertySelections_1.UserSelect,
                },
                {
                    path: "projects",
                    model: "Project",
                },
            ]);
            const dtoData = teams === null || teams === void 0 ? void 0 : teams.map((team) => this.teamSanitizer(team));
            return dtoData;
        });
    }
    updateTeam(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExistTeam = yield team_model_1.default.findById(id);
            if (!isExistTeam) {
                throw new apiError_1.default(http_status_1.default.NOT_FOUND, "Team Not Found!");
            }
            const members = [
                ...((isExistTeam === null || isExistTeam === void 0 ? void 0 : isExistTeam.activeMembers) || []),
                ...((isExistTeam === null || isExistTeam === void 0 ? void 0 : isExistTeam.pendingMembers) || []),
            ];
            // Update the team data
            const team = yield team_model_1.default.findByIdAndUpdate(id, { $set: Object.assign({}, data) }, { new: true }).populate([
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
            if ((isExistTeam === null || isExistTeam === void 0 ? void 0 : isExistTeam.name) !== (data === null || data === void 0 ? void 0 : data.name)) {
                // Notify all members about the name change
                const allMembers = [
                    ...((team === null || team === void 0 ? void 0 : team.activeMembers) || []),
                    ...((team === null || team === void 0 ? void 0 : team.pendingMembers) || []),
                ];
                yield Promise.all(allMembers.map((member) => __awaiter(this, void 0, void 0, function* () {
                    const notifyObject = {
                        title: "Team Name Updated",
                        type: enums_1.NotificationEnums.TEAM_UPDATED,
                        receiver: member === null || member === void 0 ? void 0 : member._id,
                        sender: team === null || team === void 0 ? void 0 : team.admin,
                        content: `Dear ${member === null || member === void 0 ? void 0 : member.name}, the team name has been updated. The team "${isExistTeam === null || isExistTeam === void 0 ? void 0 : isExistTeam.name}" is now named "${data === null || data === void 0 ? void 0 : data.name}". Thank you for staying up to date with these changes!`,
                        link: `${envConfig_1.config.app.frontendDomain}/teams/joined-teams?userId=${member === null || member === void 0 ? void 0 : member._id}&name=${member === null || member === void 0 ? void 0 : member.name}&email=${member === null || member === void 0 ? void 0 : member.email}`,
                    };
                    yield notification_service_1.NotificationService.createNotification(notifyObject);
                })));
                return members;
            }
        });
    }
    deleteTeam(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield mongoose_1.default.startSession();
            session.startTransaction();
            try {
                const team = yield team_model_1.default.findById(id);
                if (!team) {
                    throw new apiError_1.default(http_status_1.default.NOT_FOUND, "Team Not Found!");
                }
                const members = [
                    ...((team === null || team === void 0 ? void 0 : team.activeMembers) || []),
                    ...((team === null || team === void 0 ? void 0 : team.pendingMembers) || []),
                ];
                // // Handle Cloudinary file deletion
                const public_id = (0, getCloudinaryFilePublicIdFromUrl_1.default)(team === null || team === void 0 ? void 0 : team.image);
                if (public_id) {
                    yield (0, deletePreviousFileFromCloudinary_1.deleteSingleFileFromCloudinary)(public_id);
                }
                // Delete the team
                yield team_model_1.default.findByIdAndDelete(id).session(session);
                // Delete related projects
                yield project_service_1.ProjectService.deleteProjectsByTeamId(id, session);
                yield Promise.all(members.map((member) => __awaiter(this, void 0, void 0, function* () {
                    const notifyObject = {
                        title: "Team Deleted",
                        type: enums_1.NotificationEnums.TEAM_DELETED,
                        receiver: member === null || member === void 0 ? void 0 : member._id,
                        sender: team === null || team === void 0 ? void 0 : team.admin,
                        content: `We're deeply grateful for your time and contributions to the team. As we say goodbye, we want to express our heartfelt thanks and admiration. Wishing you all the best in your future endeavors!`,
                        link: `${envConfig_1.config.app.frontendDomain}/teams/joined-teams?userId=${member === null || member === void 0 ? void 0 : member._id}&name=${member === null || member === void 0 ? void 0 : member.name}&email=${member === null || member === void 0 ? void 0 : member.email}`,
                    };
                    yield notification_service_1.NotificationService.createNotification(notifyObject, session);
                })));
                yield session.commitTransaction();
                return members === null || members === void 0 ? void 0 : members.map((member) => member === null || member === void 0 ? void 0 : member.id);
            }
            catch (error) {
                yield session.abortTransaction();
                throw new apiError_1.default(http_status_1.default.BAD_REQUEST, "Team was not deleted");
            }
            finally {
                session.endSession();
            }
        });
    }
    sendLeaveRequest(teamId, memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            const team = yield team_model_1.default.updateOne({ _id: teamId }, { $push: { leaveRequests: memberId } });
            const admin = yield user_service_1.UserService.findUserById(team === null || team === void 0 ? void 0 : team.admin);
            const notifyObject = {
                title: "Team Leave Request",
                type: enums_1.NotificationEnums.TEAM_LEFT,
                sender: memberId,
                receiver: admin === null || admin === void 0 ? void 0 : admin.id,
                content: `You have received a new request from a team member to leave the team. Please review the request and take appropriate action.`,
                link: `${envConfig_1.config.app.frontendDomain}/dashboard/leave-requests?userId=${admin === null || admin === void 0 ? void 0 : admin.id}&name=${admin === null || admin === void 0 ? void 0 : admin.name}&email=${admin === null || admin === void 0 ? void 0 : admin.email}`,
            };
            // Send notification to the admin
            yield notification_service_1.NotificationService.createNotification(notifyObject);
        });
    }
    cancelLeaveRequest(teamId, memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log({ teamId, memberId });
            const team = yield team_model_1.default.updateOne({ _id: teamId }, { $pull: { leaveRequests: memberId } });
            const admin = yield user_service_1.UserService.findUserById(team === null || team === void 0 ? void 0 : team.admin);
            const notifyObject = {
                title: "Team Leave Request",
                type: enums_1.NotificationEnums.TEAM_LEFT,
                sender: memberId,
                receiver: admin === null || admin === void 0 ? void 0 : admin.id,
                content: `Team Leave Request Cancelled`,
                link: `${envConfig_1.config.app.frontendDomain}/dashboard/leave-requests?userId=${admin === null || admin === void 0 ? void 0 : admin.id}&name=${admin === null || admin === void 0 ? void 0 : admin.name}&email=${admin === null || admin === void 0 ? void 0 : admin.email}`,
            };
            // Send notification to the admin
            yield notification_service_1.NotificationService.createNotification(notifyObject);
        });
    }
    rejectLeaveRequest(teamId, memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            const team = yield team_model_1.default.updateOne({ _id: teamId }, { $pull: { leaveRequests: memberId } });
            const member = yield user_service_1.UserService.findUserById(memberId);
            const notifyObject = {
                title: "Leave Request Rejected",
                type: enums_1.NotificationEnums.TEAM_LEFT,
                sender: team.admin,
                receiver: memberId,
                content: `Your request to leave the team "${team === null || team === void 0 ? void 0 : team.name}" has been declined by the admin.`,
                link: `${envConfig_1.config.app.frontendDomain}/teams/joined-teams?userId=${member === null || member === void 0 ? void 0 : member.id}&name=${member === null || member === void 0 ? void 0 : member.name}&email=${member === null || member === void 0 ? void 0 : member.email}`,
            };
            // Send notification to the member
            yield notification_service_1.NotificationService.createNotification(notifyObject);
        });
    }
    acceptLeaveRequest(teamId, memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log({ teamId, memberId });
            const team = yield team_model_1.default.updateOne({ _id: teamId }, { $pull: { leaveRequests: memberId, activeMembers: memberId } }, { new: true });
            // Remove this member from projects by member ID
            yield project_model_1.Project.updateMany({ team: teamId }, { $pull: { members: { memberId: memberId } } });
            if (team && (team === null || team === void 0 ? void 0 : team.admin)) {
                const member = yield user_service_1.UserService.findUserById(memberId);
                const notifyObject = {
                    title: "Your Leave Request Accepted And You Have Been Removed from a Team",
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
    removeMember(teamId, memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Remove member from team
            yield team_model_1.default.updateOne({ _id: teamId }, { $pull: { activeMembers: memberId } });
            const team = yield team_model_1.default.findById(teamId);
            // Remove this member from projects by member ID
            yield project_model_1.Project.updateMany({ team: teamId }, { $pull: { members: { memberId: memberId } } });
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
