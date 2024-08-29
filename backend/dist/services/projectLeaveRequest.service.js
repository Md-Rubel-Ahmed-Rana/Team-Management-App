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
const enums_1 = require("enums");
const http_status_1 = __importDefault(require("http-status"));
const notification_service_1 = require("./notification.service");
const envConfig_1 = require("@/configurations/envConfig");
const project_service_1 = require("./project.service");
class Service {
    requestToLeave(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            const isExist = yield projectLeaveRequest_model_1.ProjectLeaveRequest.findOne({
                project: data.project,
                member: data.member,
            });
            if (isExist) {
                throw new apiError_1.default(http_status_1.default.BAD_REQUEST, "You already have requested to leave");
            }
            const result = yield projectLeaveRequest_model_1.ProjectLeaveRequest.create(data);
            const project = yield result.populate([
                {
                    path: "project",
                    model: "Project",
                    select: { name: 1, category: 1 },
                },
                {
                    path: "member",
                    model: "User",
                    select: "name",
                },
                {
                    path: "admin",
                    model: "User",
                    select: { name: 1, email: 1 },
                },
            ]);
            const notifyObject = {
                title: "Project Leave Request",
                type: enums_1.NotificationEnums.PROJECT_LEAVE_REQUEST,
                sender: data === null || data === void 0 ? void 0 : data.member,
                receiver: data === null || data === void 0 ? void 0 : data.admin,
                content: `Dear ${(_a = project === null || project === void 0 ? void 0 : project.admin) === null || _a === void 0 ? void 0 : _a.name}, ${(_b = project === null || project === void 0 ? void 0 : project.member) === null || _b === void 0 ? void 0 : _b.name} has requested to leave the project "${(_c = project === null || project === void 0 ? void 0 : project.project) === null || _c === void 0 ? void 0 : _c.name}" in the ${(_d = project === null || project === void 0 ? void 0 : project.project) === null || _d === void 0 ? void 0 : _d.category} category. Please review their request and take the necessary actions.`,
                link: `${envConfig_1.config.app.frontendDomain}/dashboard/leave-requests?userId=${((_e = project === null || project === void 0 ? void 0 : project.admin) === null || _e === void 0 ? void 0 : _e.id) || ((_f = project === null || project === void 0 ? void 0 : project.admin) === null || _f === void 0 ? void 0 : _f._id)}&name=${(_g = project === null || project === void 0 ? void 0 : project.admin) === null || _g === void 0 ? void 0 : _g.name}&email=${(_h = project === null || project === void 0 ? void 0 : project.admin) === null || _h === void 0 ? void 0 : _h.email}`,
            };
            // Send notification to the admin
            yield notification_service_1.NotificationService.createNotification(notifyObject);
        });
    }
    acceptLeaveRequest(projectId, memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g;
            yield project_service_1.ProjectService.removeMember(projectId, memberId);
            const project = yield projectLeaveRequest_model_1.ProjectLeaveRequest.findOneAndUpdate({ project: projectId, member: memberId }, { $set: { status: "accepted" } }, { new: true }).populate([
                {
                    path: "project",
                    model: "Project",
                    select: { name: 1, category: 1 },
                },
                {
                    path: "member",
                    model: "User",
                    select: { name: 1, email: 1 },
                },
            ]);
            const notifyObject = {
                title: "Your Project Leave Request Has Been Accepted",
                type: enums_1.NotificationEnums.PROJECT_LEAVE_REQUEST,
                sender: project === null || project === void 0 ? void 0 : project.admin,
                receiver: memberId,
                content: `Dear ${(_a = project === null || project === void 0 ? void 0 : project.member) === null || _a === void 0 ? void 0 : _a.name}, your request to leave the project "${(_b = project === null || project === void 0 ? void 0 : project.project) === null || _b === void 0 ? void 0 : _b.name}" in the ${(_c = project === null || project === void 0 ? void 0 : project.project) === null || _c === void 0 ? void 0 : _c.category} category has been accepted. We want to express our gratitude for your contributions and efforts during your time on this project. We wish you all the best in your future endeavors.`,
                link: `${envConfig_1.config.app.frontendDomain}/projects/joined-projects?userId=${((_d = project === null || project === void 0 ? void 0 : project.member) === null || _d === void 0 ? void 0 : _d.id) || ((_e = project === null || project === void 0 ? void 0 : project.member) === null || _e === void 0 ? void 0 : _e._id)}&name=${(_f = project === null || project === void 0 ? void 0 : project.member) === null || _f === void 0 ? void 0 : _f.name}&email=${(_g = project === null || project === void 0 ? void 0 : project.member) === null || _g === void 0 ? void 0 : _g.email}`,
            };
            yield notification_service_1.NotificationService.createNotification(notifyObject);
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
            var _a, _b, _c, _d;
            const result = yield projectLeaveRequest_model_1.ProjectLeaveRequest.findByIdAndUpdate(requestId, { $set: { status: "ignored" } }, { new: true }).populate([
                {
                    path: "project",
                    model: "Project",
                    select: "name",
                },
                {
                    path: "member",
                    model: "User",
                    select: "name",
                },
            ]);
            const notifyObject = {
                title: "Project Leave Request Declined",
                type: enums_1.NotificationEnums.PROJECT_LEAVE_REQUEST,
                sender: result === null || result === void 0 ? void 0 : result.admin,
                receiver: (_a = result === null || result === void 0 ? void 0 : result.member) === null || _a === void 0 ? void 0 : _a._id,
                content: `Dear ${(_b = result === null || result === void 0 ? void 0 : result.member) === null || _b === void 0 ? void 0 : _b.name}, your request to leave the project "${(_c = result === null || result === void 0 ? void 0 : result.project) === null || _c === void 0 ? void 0 : _c.name}" has been reviewed. The admin has decided that your continued participation is valuable to the success of the project. We believe your skills and contributions are essential to achieving our goals together. Let's continue to work towards our shared success.`,
                link: `${envConfig_1.config.app.frontendDomain}/projects/joined-projects?userId=${(_d = result === null || result === void 0 ? void 0 : result.member) === null || _d === void 0 ? void 0 : _d._id}`,
            };
            // Send notification to the member
            yield notification_service_1.NotificationService.createNotification(notifyObject);
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
