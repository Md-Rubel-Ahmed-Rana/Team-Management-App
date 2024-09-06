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
exports.ProjectService = void 0;
const project_model_1 = require("@/models/project.model");
const apiError_1 = __importDefault(require("@/shared/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const notification_service_1 = require("./notification.service");
const projectLeaveRequest_model_1 = require("@/models/projectLeaveRequest.model");
const user_service_1 = require("./user.service");
const task_service_1 = require("./task.service");
const mongoose_1 = __importDefault(require("mongoose"));
const propertySelections_1 = require("propertySelections");
const enums_1 = require("enums");
const envConfig_1 = require("@/configurations/envConfig");
class Service {
    projectSanitizer(project) {
        var _a, _b;
        const members = (_a = project === null || project === void 0 ? void 0 : project.members) === null || _a === void 0 ? void 0 : _a.map((user) => user_service_1.UserService.userSanitizer(user));
        const leaveRequests = (_b = project === null || project === void 0 ? void 0 : project.leaveRequests) === null || _b === void 0 ? void 0 : _b.map((user) => user_service_1.UserService.userSanitizer(user));
        return {
            id: String(project === null || project === void 0 ? void 0 : project._id),
            team: project === null || project === void 0 ? void 0 : project.team,
            user: project === null || project === void 0 ? void 0 : project.user,
            name: project === null || project === void 0 ? void 0 : project.name,
            category: project === null || project === void 0 ? void 0 : project.category,
            members: members || [],
            leaveRequests: leaveRequests || [],
            tasks: (project === null || project === void 0 ? void 0 : project.tasks) || 0,
            createdAt: project === null || project === void 0 ? void 0 : project.createdAt,
            updatedAt: project === null || project === void 0 ? void 0 : project.updatedAt,
        };
    }
    createProject(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProject = yield project_model_1.Project.create(data);
            const dtoProject = this.projectSanitizer(newProject);
            // keep/store the project on cache
        });
    }
    getAllProjects() {
        return __awaiter(this, void 0, void 0, function* () {
            const projects = yield project_model_1.Project.find({});
            const dtoData = projects === null || projects === void 0 ? void 0 : projects.map((project) => this.projectSanitizer(project));
            return dtoData;
        });
    }
    myProjects(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const projects = yield project_model_1.Project.find({ user: userId });
            const dtoData = projects === null || projects === void 0 ? void 0 : projects.map((project) => this.projectSanitizer(project));
            return dtoData;
        });
    }
    assignedProjects(memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            const projects = yield project_model_1.Project.find({ members: memberId });
            const dtoData = projects === null || projects === void 0 ? void 0 : projects.map((project) => this.projectSanitizer(project));
            return dtoData;
        });
    }
    updateProject(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { name, category } = data;
            const session = yield mongoose_1.default.startSession();
            session.startTransaction();
            try {
                const project = yield project_model_1.Project.findById(id);
                const updatedProject = yield project_model_1.Project.findOneAndUpdate({ _id: id }, { $set: { name, category } }, { new: true })
                    .populate([
                    {
                        path: "user",
                        model: "User",
                        select: propertySelections_1.UserSelect,
                    },
                    {
                        path: "team",
                        model: "Team",
                        select: propertySelections_1.TeamSelect,
                    },
                    {
                        path: "members",
                        model: "User",
                        select: propertySelections_1.UserSelect,
                    },
                ])
                    .session(session);
                const dtoData = this.projectSanitizer(updatedProject);
                if ((dtoData === null || dtoData === void 0 ? void 0 : dtoData.members) && ((_a = dtoData === null || dtoData === void 0 ? void 0 : dtoData.members) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                    const changeDetails = [];
                    if (name)
                        changeDetails.push(`"${project === null || project === void 0 ? void 0 : project.name}" to "${name}"`);
                    if (category)
                        changeDetails.push(`category to "${category}"`);
                    const changes = changeDetails.join(" and ");
                    // Send notifications to all members about the updates
                    yield Promise.all(dtoData === null || dtoData === void 0 ? void 0 : dtoData.members.map((member) => __awaiter(this, void 0, void 0, function* () {
                        const notifyObject = {
                            title: "Project Updated",
                            type: enums_1.NotificationEnums.PROJECT_UPDATED,
                            receiver: member === null || member === void 0 ? void 0 : member.id,
                            sender: updatedProject === null || updatedProject === void 0 ? void 0 : updatedProject.user,
                            content: `Dear ${member === null || member === void 0 ? void 0 : member.name}, the project "${project === null || project === void 0 ? void 0 : project.name}" has been updated. The ${changes} have been changed. Thank you for staying up to date with these changes!`,
                            link: `${envConfig_1.config.app.frontendDomain}/projects/joined-projects?userId=${member === null || member === void 0 ? void 0 : member.id}&name=${member === null || member === void 0 ? void 0 : member.name}&email=${member === null || member === void 0 ? void 0 : member.email}`,
                        };
                        yield notification_service_1.NotificationService.createNotification(notifyObject, session);
                    })));
                }
                // Commit the transaction
                yield session.commitTransaction();
                // keep the updated project on cache
                return project === null || project === void 0 ? void 0 : project.members;
            }
            catch (error) {
                // Abort the transaction in case of an error
                yield session.abortTransaction();
                throw new apiError_1.default(http_status_1.default.BAD_REQUEST, "Project wasn't updated");
            }
            finally {
                // End the session
                session.endSession();
            }
        });
    }
    deleteProject(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const session = yield mongoose_1.default.startSession();
            session.startTransaction();
            try {
                const project = yield this.getSingleProjectById(id);
                if ((project === null || project === void 0 ? void 0 : project.members) && (project === null || project === void 0 ? void 0 : project.members.length) > 0) {
                    const projectDetails = `project "${project === null || project === void 0 ? void 0 : project.name}" in the ${project === null || project === void 0 ? void 0 : project.category} category`;
                    yield Promise.all((_a = project === null || project === void 0 ? void 0 : project.members) === null || _a === void 0 ? void 0 : _a.map((member) => __awaiter(this, void 0, void 0, function* () {
                        const notifyObject = {
                            title: "Project Deleted",
                            type: enums_1.NotificationEnums.PROJECT_DELETED,
                            receiver: member === null || member === void 0 ? void 0 : member.id,
                            sender: project === null || project === void 0 ? void 0 : project.user,
                            content: `Dear ${member === null || member === void 0 ? void 0 : member.name}, the ${projectDetails} has been successfully completed and removed from the system. We truly appreciate your hard work and dedication throughout this project. We look forward to collaborating with you on future projects!`,
                            link: `${envConfig_1.config.app.frontendDomain}/projects/joined-projects?userId=${member === null || member === void 0 ? void 0 : member.id}&name=${member === null || member === void 0 ? void 0 : member.name}&email=${member === null || member === void 0 ? void 0 : member.email}`,
                        };
                        yield notification_service_1.NotificationService.createNotification(notifyObject, session);
                    })));
                }
                yield project_model_1.Project.findByIdAndDelete(id).session(session);
                yield task_service_1.TaskService.deleteTasksByProjectId(id, session);
                yield session.commitTransaction();
                // delete this project from cache
                return project === null || project === void 0 ? void 0 : project.members.map((member) => member === null || member === void 0 ? void 0 : member.id);
            }
            catch (error) {
                yield session.abortTransaction();
                throw new apiError_1.default(http_status_1.default.BAD_REQUEST, "Project wasn't deleted");
            }
            finally {
                session.endSession();
            }
        });
    }
    deleteProjectsByTeamId(teamId, session) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const deletableProjects = yield project_model_1.Project.find({ team: teamId }).session(session);
            const projects = deletableProjects === null || deletableProjects === void 0 ? void 0 : deletableProjects.map((project) => this.projectSanitizer(project));
            if (projects && (projects === null || projects === void 0 ? void 0 : projects.length) > 0) {
                for (const project of projects) {
                    // Notify all members about the project deletion
                    if ((project === null || project === void 0 ? void 0 : project.members) && ((_a = project === null || project === void 0 ? void 0 : project.members) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                        const projectDetails = `project "${project === null || project === void 0 ? void 0 : project.name}" in the ${project === null || project === void 0 ? void 0 : project.category} category`;
                        yield Promise.all((_b = project === null || project === void 0 ? void 0 : project.members) === null || _b === void 0 ? void 0 : _b.map((member) => __awaiter(this, void 0, void 0, function* () {
                            const notifyObject = {
                                title: "Project Deleted",
                                type: enums_1.NotificationEnums.PROJECT_DELETED,
                                receiver: member === null || member === void 0 ? void 0 : member.id,
                                sender: project === null || project === void 0 ? void 0 : project.user,
                                content: `Dear ${member === null || member === void 0 ? void 0 : member.name}, the ${projectDetails} has been successfully completed and removed from the system. We truly appreciate your hard work and dedication throughout this project. We look forward to collaborating with you on future projects!`,
                                link: `${envConfig_1.config.app.frontendDomain}/projects/joined-projects?userId=${member === null || member === void 0 ? void 0 : member.id}&name=${member === null || member === void 0 ? void 0 : member.name}&email=${member === null || member === void 0 ? void 0 : member.email}`,
                            };
                            yield notification_service_1.NotificationService.createNotification(notifyObject, session);
                        })));
                    }
                    yield task_service_1.TaskService.deleteTasksByProjectId(project === null || project === void 0 ? void 0 : project.id, session);
                }
                yield project_model_1.Project.deleteMany({
                    team: teamId,
                }).session(session);
                // update projects on cache
            }
        });
    }
    getProjectByTeamId(teamId) {
        return __awaiter(this, void 0, void 0, function* () {
            const projects = yield project_model_1.Project.find({ team: teamId }).populate([
                {
                    path: "members",
                    model: "User",
                    select: propertySelections_1.UserSelect,
                },
            ]);
            const dtoData = projects === null || projects === void 0 ? void 0 : projects.map((project) => this.projectSanitizer(project));
            return dtoData;
        });
    }
    getSingleProjectById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield project_model_1.Project.findById(id).populate([
                {
                    path: "members",
                    model: "User",
                    select: propertySelections_1.UserSelect,
                },
            ]);
            const dtoData = this.projectSanitizer(result);
            return dtoData;
        });
    }
    addMember(projectId, memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield project_model_1.Project.findById(projectId);
            if (!project) {
                throw new apiError_1.default(http_status_1.default.NOT_FOUND, "Project not found");
            }
            const existingMember = yield project_model_1.Project.findOne({
                _id: projectId,
                "members.member": memberId,
            });
            if (existingMember) {
                throw new apiError_1.default(http_status_1.default.BAD_REQUEST, "This member is already in this project");
            }
            yield project_model_1.Project.findByIdAndUpdate(projectId, {
                $push: { members: memberId },
            }, { new: true });
            if (project === null || project === void 0 ? void 0 : project.user) {
                const member = yield user_service_1.UserService.findUserById(memberId);
                const notifyObject = {
                    title: "You have been added to a project",
                    type: enums_1.NotificationEnums.PROJECT_MEMBER_ADDED,
                    content: `Congratulations! You've been added to the project "${project.name}" in the "${project.category}" category. Your skills and contributions are highly valued, and we’re excited to have you on board!`,
                    link: `${envConfig_1.config.app.frontendDomain}/projects/joined-projects?userId=${memberId}&name=${member === null || member === void 0 ? void 0 : member.name}&email=${member === null || member === void 0 ? void 0 : member.email}`,
                    sender: project === null || project === void 0 ? void 0 : project.user,
                    receiver: memberId,
                };
                yield notification_service_1.NotificationService.createNotification(notifyObject);
            }
            // update member count on cache
        });
    }
    removeMember(projectId, memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield project_model_1.Project.findById(projectId);
            if (!project) {
                throw new apiError_1.default(http_status_1.default.NOT_FOUND, "Project not found");
            }
            yield project_model_1.Project.findByIdAndUpdate(projectId, {
                $pull: { members: memberId },
            }, { new: true });
            // Update the most recent leave request for the project
            yield projectLeaveRequest_model_1.ProjectLeaveRequest.findOneAndUpdate({ project: projectId, member: memberId }, { $set: { status: "accepted" } });
            if (project === null || project === void 0 ? void 0 : project.user) {
                const member = yield user_service_1.UserService.findUserById(memberId);
                const notifyObject = {
                    title: "You have been removed from a project",
                    type: enums_1.NotificationEnums.PROJECT_MEMBER_REMOVED,
                    content: `You have been removed from the project "${project === null || project === void 0 ? void 0 : project.name}" in the "${project === null || project === void 0 ? void 0 : project.category}" category. We appreciate your contributions, and we wish you success in your future endeavors.`,
                    link: `${envConfig_1.config.app.frontendDomain}/projects/joined-projects?userId=${memberId}&name=${member === null || member === void 0 ? void 0 : member.name}&email=${member === null || member === void 0 ? void 0 : member.email}`,
                    sender: project === null || project === void 0 ? void 0 : project.user,
                    receiver: memberId,
                };
                yield notification_service_1.NotificationService.createNotification(notifyObject);
            }
            // update member count on cache
        });
    }
    sendLeaveRequest(projectId, memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield project_model_1.Project.findByIdAndUpdate(projectId, {
                $push: { leaveRequests: memberId },
            });
            const member = yield user_service_1.UserService.findUserById(memberId);
            const admin = yield user_service_1.UserService.findUserById(project === null || project === void 0 ? void 0 : project.user);
            const notifyObject = {
                title: "Project Leave Request",
                type: enums_1.NotificationEnums.PROJECT_LEAVE_REQUEST,
                sender: member.id,
                receiver: admin.id,
                content: `Dear ${admin === null || admin === void 0 ? void 0 : admin.name}, ${member === null || member === void 0 ? void 0 : member.name} has requested to leave the project "${project === null || project === void 0 ? void 0 : project.name}" in the ${project === null || project === void 0 ? void 0 : project.category} category. Please review their request and take the necessary actions.`,
                link: `${envConfig_1.config.app.frontendDomain}/dashboard/leave-requests?userId=${(admin === null || admin === void 0 ? void 0 : admin.id) || (admin === null || admin === void 0 ? void 0 : admin.id)}&name=${admin === null || admin === void 0 ? void 0 : admin.name}&email=${admin === null || admin === void 0 ? void 0 : admin.email}`,
            };
            // Send notification to the admin
            yield notification_service_1.NotificationService.createNotification(notifyObject);
        });
    }
    cancelLeaveRequest(projectId, memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield project_model_1.Project.findByIdAndUpdate(projectId, {
                $pull: { leaveRequests: memberId },
            });
            const member = yield user_service_1.UserService.findUserById(memberId);
            const admin = yield user_service_1.UserService.findUserById(project === null || project === void 0 ? void 0 : project.user);
            const notifyObject = {
                title: "Project Leave Request Cancelled",
                type: enums_1.NotificationEnums.PROJECT_LEAVE_REQUEST,
                sender: member.id,
                receiver: admin.id,
                content: `Dear ${admin === null || admin === void 0 ? void 0 : admin.name}, ${member === null || member === void 0 ? void 0 : member.name} has cancelled  leave request "${project === null || project === void 0 ? void 0 : project.name}" in the ${project === null || project === void 0 ? void 0 : project.category} category. And decided not to leave from this project.`,
                link: `${envConfig_1.config.app.frontendDomain}/dashboard/leave-requests?userId=${admin === null || admin === void 0 ? void 0 : admin.id}&name=${admin === null || admin === void 0 ? void 0 : admin.name}&email=${admin === null || admin === void 0 ? void 0 : admin.email}`,
            };
            // Send notification to the admin
            yield notification_service_1.NotificationService.createNotification(notifyObject);
        });
    }
    acceptLeaveRequest(projectId, memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield project_model_1.Project.findByIdAndUpdate(projectId, {
                $pull: { leaveRequests: memberId, members: memberId },
            });
            const member = yield user_service_1.UserService.findUserById(memberId);
            const admin = yield user_service_1.UserService.findUserById(project === null || project === void 0 ? void 0 : project.user);
            const notifyObject = {
                title: "Project Leave Request Accepted",
                type: enums_1.NotificationEnums.PROJECT_LEAVE_REQUEST,
                sender: admin === null || admin === void 0 ? void 0 : admin.id,
                receiver: member === null || member === void 0 ? void 0 : member.id,
                content: `Dear ${member === null || member === void 0 ? void 0 : member.name}, ${admin === null || admin === void 0 ? void 0 : admin.name} has accepted your leave request "${project === null || project === void 0 ? void 0 : project.name}" in the ${project === null || project === void 0 ? void 0 : project.category} category. And decided to leave and remove you from this project.`,
                link: `${envConfig_1.config.app.frontendDomain}/projects/joined-projects?userId=${member === null || member === void 0 ? void 0 : member.id}&name=${member === null || member === void 0 ? void 0 : member.name}&email=${member === null || member === void 0 ? void 0 : member.email}`,
            };
            // Send notification to the admin
            yield notification_service_1.NotificationService.createNotification(notifyObject);
            // update project member count on cache
        });
    }
    rejectLeaveRequest(projectId, memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield project_model_1.Project.findByIdAndUpdate(projectId, {
                $pull: { leaveRequests: memberId },
            });
            const member = yield user_service_1.UserService.findUserById(memberId);
            const admin = yield user_service_1.UserService.findUserById(project === null || project === void 0 ? void 0 : project.user);
            const notifyObject = {
                title: "Project Leave Request Rejected",
                type: enums_1.NotificationEnums.PROJECT_LEAVE_REQUEST,
                sender: admin === null || admin === void 0 ? void 0 : admin.id,
                receiver: member === null || member === void 0 ? void 0 : member.id,
                content: `Dear ${member === null || member === void 0 ? void 0 : member.name}, ${admin === null || admin === void 0 ? void 0 : admin.name} has rejected leave request "${project === null || project === void 0 ? void 0 : project.name}" in the ${project === null || project === void 0 ? void 0 : project.category} category. And decided not to leave from this project.`,
                link: `${envConfig_1.config.app.frontendDomain}/projects/joined-projects?userId=${member === null || member === void 0 ? void 0 : member.id}&name=${member === null || member === void 0 ? void 0 : member.name}&email=${member === null || member === void 0 ? void 0 : member.email}`,
            };
            // Send notification to the admin
            yield notification_service_1.NotificationService.createNotification(notifyObject);
        });
    }
}
exports.ProjectService = new Service();
