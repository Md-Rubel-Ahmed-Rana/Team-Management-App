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
const mapper_1 = require("../mapper");
const project_entity_1 = require("@/entities/project.entity");
const create_1 = require("@/dto/project/create");
const getOnlyProject_1 = require("@/dto/project/getOnlyProject");
const get_1 = require("@/dto/project/get");
const update_1 = require("@/dto/project/update");
const delete_1 = require("@/dto/project/delete");
class Service {
    createProject(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield project_model_1.Project.create(data);
            const mappedData = mapper_1.mapper.map(result, project_entity_1.ProjectEntity, create_1.CreateProjectDTO);
            return mappedData;
        });
    }
    myProjects(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield project_model_1.Project.find({ user: userId });
            const mappedData = mapper_1.mapper.mapArray(result, project_entity_1.ProjectEntity, getOnlyProject_1.GetOnlyProjectDTO);
            return mappedData;
        });
    }
    assignedProjects(memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield project_model_1.Project.find({ members: memberId });
            const mappedData = mapper_1.mapper.mapArray(result, project_entity_1.ProjectEntity, getOnlyProject_1.GetOnlyProjectDTO);
            return mappedData;
        });
    }
    updateProject(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, category } = data;
            const result = yield project_model_1.Project.findOneAndUpdate({ _id: id }, { $set: { name, category } }, { new: true });
            const mappedData = mapper_1.mapper.map(result, project_entity_1.ProjectEntity, getOnlyProject_1.GetOnlyProjectDTO);
            return mappedData;
        });
    }
    deleteProject(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield project_model_1.Project.findByIdAndDelete(id);
            const mappedData = mapper_1.mapper.map(result, project_entity_1.ProjectEntity, delete_1.DeleteProjectDTO);
            return mappedData;
        });
    }
    getSingleProject(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield project_model_1.Project.findById(id)
                .populate("members")
                .populate("team", "name");
            const mappedData = mapper_1.mapper.map(result, project_entity_1.ProjectEntity, get_1.GetProjectDTO);
            return mappedData;
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
                const result = yield notification_service_1.NotificationService.sendNotification(project === null || project === void 0 ? void 0 : project.user, memberId, "project_invitation", "Assigned to project", `You've been added to a project (${project === null || project === void 0 ? void 0 : project.name})`, `projects?team=${project === null || project === void 0 ? void 0 : project.team}&id=${project._id}&name=${project === null || project === void 0 ? void 0 : project.name}`);
                return result;
            }
        });
    }
    removeMember(projectId, memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield project_model_1.Project.findById(projectId);
            if (!project) {
                throw new apiError_1.default(http_status_1.default.NOT_FOUND, "Project not found");
            }
            const result = yield project_model_1.Project.findByIdAndUpdate(projectId, {
                $pull: { members: memberId },
            }, { new: true });
            // update leave request for project
            yield projectLeaveRequest_model_1.ProjectLeaveRequest.findOneAndUpdate({ project: projectId }, { $set: { status: "accepted" } }).sort({ createdAt: -1 });
            if (project === null || project === void 0 ? void 0 : project.user) {
                yield notification_service_1.NotificationService.sendNotification(project === null || project === void 0 ? void 0 : project.user, memberId, "project_invitation", "Assigned to project", `You've been removed from a project (${project === null || project === void 0 ? void 0 : project.name})`, "projects");
            }
            const mappedData = mapper_1.mapper.map(result, project_entity_1.ProjectEntity, update_1.UpdateProjectDTO);
            return mappedData;
        });
    }
}
exports.ProjectService = new Service();
