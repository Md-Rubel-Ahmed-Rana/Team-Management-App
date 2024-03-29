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
exports.ProjectController = void 0;
const project_service_1 = require("@/services/project.service");
const rootController_1 = __importDefault(require("@/shared/rootController"));
const http_status_1 = __importDefault(require("http-status"));
class Controller extends rootController_1.default {
    constructor() {
        super(...arguments);
        this.createProject = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield project_service_1.ProjectService.createProject(req.body);
            this.apiResponse(res, {
                statusCode: http_status_1.default.CREATED,
                success: true,
                message: "Project created successfully",
                data: result,
            });
        }));
        this.myProjects = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            const projects = yield project_service_1.ProjectService.myProjects(userId);
            this.apiResponse(res, {
                statusCode: http_status_1.default.OK,
                success: true,
                message: "Projects found",
                data: projects,
            });
        }));
        this.assignedProjects = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const memberId = req.params.memberId;
            const projects = yield project_service_1.ProjectService.assignedProjects(memberId);
            this.apiResponse(res, {
                statusCode: http_status_1.default.OK,
                success: true,
                message: "Projects for assigned found",
                data: projects,
            });
        }));
        this.updateProject = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const result = yield project_service_1.ProjectService.updateProject(id, req.body);
            this.apiResponse(res, {
                statusCode: http_status_1.default.OK,
                success: true,
                message: "Project updated successfully",
                data: result,
            });
        }));
        this.getSingleProject = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const result = yield project_service_1.ProjectService.getSingleProject(id);
            this.apiResponse(res, {
                statusCode: http_status_1.default.OK,
                success: true,
                message: "Project found",
                data: result,
            });
        }));
        this.addMember = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { projectId, role, memberId } = req.body;
            const result = yield project_service_1.ProjectService.addMember(projectId, memberId);
            this.apiResponse(res, {
                statusCode: http_status_1.default.OK,
                success: true,
                message: "Member added successfully",
                data: result,
            });
        }));
        this.removeMember = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { projectId, memberId } = req.body;
            const result = yield project_service_1.ProjectService.removeMember(projectId, memberId);
            this.apiResponse(res, {
                statusCode: http_status_1.default.OK,
                success: true,
                message: "Member removed successfully",
                data: result,
            });
        }));
    }
}
exports.ProjectController = new Controller();
