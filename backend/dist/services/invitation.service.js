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
exports.InvitationService = void 0;
const team_model_1 = __importDefault(require("@/models/team.model"));
const notification_service_1 = require("./notification.service");
const propertySelections_1 = require("propertySelections");
const enums_1 = require("enums");
const team_service_1 = require("./team.service");
const envConfig_1 = require("@/configurations/envConfig");
const user_service_1 = require("./user.service");
class Service {
    sendInvitation(teamId, memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            const team = yield team_service_1.TeamService.getTeamById(teamId);
            yield team_model_1.default.findByIdAndUpdate(teamId, {
                $addToSet: { pendingMembers: memberId },
            }, { new: true });
            const member = yield user_service_1.UserService.findUserById(memberId);
            const notifyObject = {
                title: "You have been invited to join a team",
                type: enums_1.NotificationEnums.TEAM_INVITATION,
                content: `Exciting news! You've been invited to join the team "${team === null || team === void 0 ? void 0 : team.name}" in the "${team === null || team === void 0 ? void 0 : team.category}" category. We believe your skills and passion will be a perfect fit. Let’s achieve great things together!`,
                receiver: memberId,
                sender: team === null || team === void 0 ? void 0 : team.admin,
                link: `${envConfig_1.config.app.frontendDomain}/dashboard/invitations?userId=${memberId}&name=${member === null || member === void 0 ? void 0 : member.name}&email=${member === null || member === void 0 ? void 0 : member.email}`,
            };
            yield notification_service_1.NotificationService.createNotification(notifyObject);
        });
    }
    rejectInvitation(teamId, memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            const team = yield team_service_1.TeamService.getTeamById(teamId);
            yield team_model_1.default.findByIdAndUpdate(teamId, {
                $pull: { pendingMembers: memberId },
            }, { new: true });
            const member = yield user_service_1.UserService.findUserById(memberId);
            const notifyObject = {
                title: "Team invitation rejected",
                type: enums_1.NotificationEnums.TEAM_INVITATION_REJECTED,
                content: `${member === null || member === void 0 ? void 0 : member.name} has declined the invitation to join your team "${team === null || team === void 0 ? void 0 : team.name}" in the "${team === null || team === void 0 ? void 0 : team.category}" category. You may want to reach out or invite someone else to fill the position.`,
                receiver: team === null || team === void 0 ? void 0 : team.admin,
                sender: memberId,
                link: `${envConfig_1.config.app.frontendDomain}/teams/details/${teamId}?team_name=${team === null || team === void 0 ? void 0 : team.name}&team_category=${team === null || team === void 0 ? void 0 : team.category}&team_description=${team.description}`,
            };
            yield notification_service_1.NotificationService.createNotification(notifyObject);
        });
    }
    cancelInvitation(teamId, memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            const team = yield team_service_1.TeamService.getTeamById(teamId);
            yield team_model_1.default.findByIdAndUpdate(teamId, {
                $pull: { pendingMembers: memberId },
            }, { new: true });
            const member = yield user_service_1.UserService.findUserById(memberId);
            const notifyObject = {
                title: "Team invitation cancelled",
                type: enums_1.NotificationEnums.TEAM_INVITATION_CANCELED,
                content: `The invitation to join the team "${team === null || team === void 0 ? void 0 : team.name}" in the "${team === null || team === void 0 ? void 0 : team.category}" category has been canceled. We hope to collaborate in the future.`,
                receiver: memberId,
                sender: team === null || team === void 0 ? void 0 : team.admin,
                link: `${envConfig_1.config.app.frontendDomain}/dashboard/invitations?userId=${memberId}&name=${member === null || member === void 0 ? void 0 : member.name}&email=${member === null || member === void 0 ? void 0 : member.email}`,
            };
            yield notification_service_1.NotificationService.createNotification(notifyObject);
        });
    }
    acceptInvitation(teamId, memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            const team = yield team_service_1.TeamService.getTeamById(teamId);
            yield team_model_1.default.findByIdAndUpdate(teamId, {
                $addToSet: { activeMembers: memberId },
                $pull: { pendingMembers: memberId },
            }, { new: true });
            const member = yield user_service_1.UserService.findUserById(memberId);
            const notifyObject = {
                title: "Team invitation accepted",
                type: enums_1.NotificationEnums.TEAM_INVITATION_ACCEPTED,
                content: `Great news! ${member === null || member === void 0 ? void 0 : member.name} has accepted the invitation to join your team "${team === null || team === void 0 ? void 0 : team.name}" in the "${team === null || team === void 0 ? void 0 : team.category}" category. Get ready to collaborate and achieve great things together!`,
                receiver: team === null || team === void 0 ? void 0 : team.admin,
                sender: memberId,
                link: `${envConfig_1.config.app.frontendDomain}/teams/details/${teamId}?team_name=${team === null || team === void 0 ? void 0 : team.name}&team_category=${team === null || team === void 0 ? void 0 : team.category}&team_description=${team.description}`,
            };
            yield notification_service_1.NotificationService.createNotification(notifyObject);
        });
    }
    pendingInvitation(memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield team_model_1.default.find({ pendingMembers: memberId }).populate([
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
}
exports.InvitationService = new Service();
