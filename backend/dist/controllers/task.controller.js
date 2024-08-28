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
exports.TaskController = void 0;
const task_service_1 = require("@/services/task.service");
const rootController_1 = __importDefault(require("@/shared/rootController"));
const http_status_1 = __importDefault(require("http-status"));
class Controller extends rootController_1.default {
    constructor() {
        super(...arguments);
        this.createTask = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield task_service_1.TaskService.createTask(req.body);
            this.apiResponse(res, {
                statusCode: http_status_1.default.CREATED,
                success: true,
                message: "Task created  successfully",
                data: result,
            });
        }));
        this.getTasksByProjectId = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const projectId = req.params.projectId;
            const tasks = yield task_service_1.TaskService.getTasksByProjectId(projectId);
            this.apiResponse(res, {
                statusCode: http_status_1.default.OK,
                success: true,
                message: "Tasks found",
                data: tasks,
            });
        }));
        this.updateTaskStatus = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const taskId = req.params.taskId;
            const status = req.body.status;
            const result = yield task_service_1.TaskService.updateTaskStatus(taskId, status, req === null || req === void 0 ? void 0 : req.id);
            this.apiResponse(res, {
                statusCode: http_status_1.default.OK,
                success: true,
                message: "Task status updated successfully",
                data: result,
            });
        }));
        this.updateTask = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name } = req.body;
            const result = yield task_service_1.TaskService.updateTask(id, name, req === null || req === void 0 ? void 0 : req.id);
            this.apiResponse(res, {
                statusCode: http_status_1.default.OK,
                success: true,
                message: "Task status updated successfully",
                data: result,
            });
        }));
        this.deleteTask = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const taskId = req.params.taskId;
            const result = yield task_service_1.TaskService.deleteTask(taskId, req === null || req === void 0 ? void 0 : req.id);
            this.apiResponse(res, {
                statusCode: http_status_1.default.OK,
                success: true,
                message: "Task deleted successfully",
                data: result,
            });
        }));
    }
}
exports.TaskController = new Controller();
