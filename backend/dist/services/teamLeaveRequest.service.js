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
exports.TeamLeaveRequestService = void 0;
const teamLeaveRequest_model_1 = require("@/models/teamLeaveRequest.model");
const apiError_1 = __importDefault(require("@/shared/apiError"));
const enums_1 = require("enums");
const http_status_1 = __importDefault(require("http-status"));
const notification_service_1 = require("./notification.service");
const envConfig_1 = require("@/configurations/envConfig");
const team_model_1 = __importDefault(require("@/models/team.model"));
const project_model_1 = require("@/models/project.model");
const user_service_1 = require("./user.service");
class Service {
    requestToLeave(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            const isExist = yield teamLeaveRequest_model_1.TeamLeaveRequest.findOne({
                team: data.team,
                member: data.member,
            });
            if (isExist) {
                throw new apiError_1.default(http_status_1.default.BAD_REQUEST, "You already have requested to leave");
            }
            const result = yield teamLeaveRequest_model_1.TeamLeaveRequest.create(data);
            const team = yield result.populate([
                {
                    path: "admin",
                    model: "User",
                    select: { name: 1, email: 1 },
                },
            ]);
            const notifyObject = {
                title: "Team Leave Request",
                type: enums_1.NotificationEnums.TEAM_LEFT,
                sender: data === null || data === void 0 ? void 0 : data.member,
                receiver: data === null || data === void 0 ? void 0 : data.admin,
                content: `You have received a new request from a team member to leave the team. Please review the request and take appropriate action.`,
                link: `${envConfig_1.config.app.frontendDomain}/dashboard/leave-requests?userId=${((_a = team === null || team === void 0 ? void 0 : team.admin) === null || _a === void 0 ? void 0 : _a.id) || ((_b = team === null || team === void 0 ? void 0 : team.admin) === null || _b === void 0 ? void 0 : _b._id)}&name=${(_c = team === null || team === void 0 ? void 0 : team.admin) === null || _c === void 0 ? void 0 : _c.name}&email=${(_d = team === null || team === void 0 ? void 0 : team.admin) === null || _d === void 0 ? void 0 : _d.email}`,
            };
            // Send notification to the admin
            yield notification_service_1.NotificationService.createNotification(notifyObject);
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
            return result;
        });
    }
    ignoreRequest(requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            const result = yield teamLeaveRequest_model_1.TeamLeaveRequest.findByIdAndUpdate(requestId, { $set: { status: "ignored" } }, { new: true }).populate([
                {
                    path: "member",
                    model: "User",
                    select: { name: 1, email: 1 },
                },
                {
                    path: "admin",
                    model: "User",
                    select: { name: 1, email: 1 },
                },
                {
                    path: "team",
                    model: "Team",
                    select: { name: 1 },
                },
            ]);
            if (!result) {
                throw new apiError_1.default(http_status_1.default.NOT_FOUND, "Leave request not found");
            }
            const notifyObject = {
                title: "Leave Request Declined",
                type: enums_1.NotificationEnums.TEAM_LEFT,
                sender: ((_a = result.admin) === null || _a === void 0 ? void 0 : _a._id) || ((_b = result.admin) === null || _b === void 0 ? void 0 : _b.id),
                receiver: (_c = result.member) === null || _c === void 0 ? void 0 : _c._id,
                content: `Your request to leave the team "${(_d = result === null || result === void 0 ? void 0 : result.team) === null || _d === void 0 ? void 0 : _d.name}" has been declined by the admin.`,
                link: `${envConfig_1.config.app.frontendDomain}/teams/joined-teams?userId=${((_e = result.admin) === null || _e === void 0 ? void 0 : _e._id) || ((_f = result.admin) === null || _f === void 0 ? void 0 : _f.id)}&name=${(_g = result === null || result === void 0 ? void 0 : result.admin) === null || _g === void 0 ? void 0 : _g.name}&email=${(_h = result === null || result === void 0 ? void 0 : result.admin) === null || _h === void 0 ? void 0 : _h.email}`,
            };
            // Send notification to the member
            yield notification_service_1.NotificationService.createNotification(notifyObject);
        });
    }
    acceptLeaveRequest(teamId, memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Remove member from team
            yield team_model_1.default.updateOne({ _id: teamId }, { $pull: { activeMembers: memberId } });
            const team = yield team_model_1.default.findById(teamId);
            if (!team) {
                throw new apiError_1.default(http_status_1.default.NOT_FOUND, "Team not found");
            }
            // Remove this member from projects by member ID
            yield project_model_1.Project.updateMany({ team: teamId }, { $pull: { members: memberId } });
            // Update leave request for team
            yield teamLeaveRequest_model_1.TeamLeaveRequest.findOneAndUpdate({ team: teamId, member: memberId }, { $set: { status: "accepted" } });
            const member = yield user_service_1.UserService.findUserById(memberId);
            // Send notification to the member
            const notifyObject = {
                title: "Team Leave Request Accepted",
                type: enums_1.NotificationEnums.TEAM_LEFT,
                sender: team === null || team === void 0 ? void 0 : team.admin,
                receiver: memberId,
                content: `Your request to leave the team "${team === null || team === void 0 ? void 0 : team.name}" has been accepted by the admin. You have been successfully removed from the team and this team related projects and tasks.`,
                link: `${envConfig_1.config.app.frontendDomain}/teams/joined-teams?userId=${member === null || member === void 0 ? void 0 : member.id}&name=${member === null || member === void 0 ? void 0 : member.name}&email=${member === null || member === void 0 ? void 0 : member.email}`,
            };
            yield notification_service_1.NotificationService.createNotification(notifyObject);
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
            return result;
        });
    }
}
exports.TeamLeaveRequestService = new Service();
