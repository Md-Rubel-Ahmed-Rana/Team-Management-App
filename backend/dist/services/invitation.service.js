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
class Service {
    sendInvitation(teamId, memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield team_model_1.default.findByIdAndUpdate(teamId, {
                $addToSet: { pendingMembers: memberId },
            }, { new: true });
            if (result && (result === null || result === void 0 ? void 0 : result.admin)) {
                const notification = yield notification_service_1.NotificationService.sendNotification(result === null || result === void 0 ? void 0 : result.admin, memberId, "team_invitation", "Team Invitation", `You've been invited to join Team (${result === null || result === void 0 ? void 0 : result.name})`, `dashboard?uId=${memberId}activeView=invitations`);
                return notification;
            }
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
    rejectInvitation(teamId, memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield team_model_1.default.findByIdAndUpdate(teamId, {
                $pull: { pendingMembers: memberId },
            }, { new: true });
            if (result && (result === null || result === void 0 ? void 0 : result.admin)) {
                const notified = yield notification_service_1.NotificationService.sendNotification(memberId, result === null || result === void 0 ? void 0 : result.admin, "team_invitation", "Team Invitation", `Your team invitation has been rejected for (${result === null || result === void 0 ? void 0 : result.name})`, `dashboard?uId=${result === null || result === void 0 ? void 0 : result._id}&activeView=my-teams`);
                return notified;
            }
        });
    }
    cancelInvitation(teamId, memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield team_model_1.default.findByIdAndUpdate(teamId, {
                $pull: { pendingMembers: memberId },
            }, { new: true });
            if (result && (result === null || result === void 0 ? void 0 : result.admin)) {
                const notified = yield notification_service_1.NotificationService.sendNotification(result === null || result === void 0 ? void 0 : result.admin, memberId, "team_invitation", "Team Invitation", `Your team invitation has been cancelled for (${result === null || result === void 0 ? void 0 : result.name})`, `dashboard/invitations?uId=${result === null || result === void 0 ? void 0 : result._id}&activeView=my-teams`);
                return notified;
            }
        });
    }
    acceptInvitation(teamId, memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield team_model_1.default.findByIdAndUpdate(teamId, {
                $addToSet: { activeMembers: memberId },
                $pull: { pendingMembers: memberId },
            }, { new: true });
            if (result && (result === null || result === void 0 ? void 0 : result.admin)) {
                const notified = yield notification_service_1.NotificationService.sendNotification(memberId, result === null || result === void 0 ? void 0 : result.admin, "team_invitation", "Team Invitation", `Your team invitation has been accepted for (${result === null || result === void 0 ? void 0 : result.name})`, `dashboard?uId=${result === null || result === void 0 ? void 0 : result._id}&activeView=my-teams`);
                return notified;
            }
        });
    }
}
exports.InvitationService = new Service();
