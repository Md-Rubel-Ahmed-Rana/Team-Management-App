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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const task_model_1 = require("@/models/task.model");
const notification_service_1 = require("./notification.service");
class Service {
    createTask(taskData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newTask = yield task_model_1.Task.create(taskData);
            // send notification to add  new  task to project
            if ((taskData === null || taskData === void 0 ? void 0 : taskData.assignedTo) && (taskData === null || taskData === void 0 ? void 0 : taskData.assignedBy)) {
                const notification = yield notification_service_1.NotificationService.sendNotification(taskData.assignedBy, taskData.assignedTo, "task_assignment", "Assigned to task", `You've been assigned to a task (${taskData === null || taskData === void 0 ? void 0 : taskData.name})`, "projects");
                const result = yield task_model_1.Task.findById(newTask === null || newTask === void 0 ? void 0 : newTask.id).populate([
                    {
                        path: "assignedTo",
                        model: "User",
                    },
                    {
                        path: "assignedBy",
                        model: "User",
                    },
                ]);
                return { notification, data: result };
            }
        });
    }
    getTasksByProjectId(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield task_model_1.Task.find({ project: projectId }).populate([
                {
                    path: "assignedTo",
                    model: "User",
                    select: { name: 1, profile_picture: 1 },
                },
                {
                    path: "assignedBy",
                    model: "User",
                    select: { name: 1, profile_picture: 1 },
                },
                {
                    path: "project",
                    model: "Project",
                    select: { name: 1, category: 1 },
                },
            ]);
            return result;
        });
    }
    updateTaskStatus(taskId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const userProjection = {
                name: 1,
                profile_picture: 1,
                email: 1,
            };
            const result = yield task_model_1.Task.findByIdAndUpdate(taskId, { $set: { status } }, { new: true }).populate([
                {
                    path: "assignedTo",
                    model: "User",
                    select: userProjection,
                },
                {
                    path: "assignedBy",
                    model: "User",
                    select: userProjection,
                },
            ]);
            return result;
        });
    }
    updateTask(taskId, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const userProjection = {
                name: 1,
                profile_picture: 1,
                email: 1,
            };
            const result = yield task_model_1.Task.findByIdAndUpdate(taskId, { $set: { name } }, { new: true }).populate([
                {
                    path: "assignedTo",
                    model: "User",
                    select: userProjection,
                },
                {
                    path: "assignedBy",
                    model: "User",
                    select: userProjection,
                },
            ]);
            return result;
        });
    }
    deleteTask(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield task_model_1.Task.findByIdAndDelete(taskId).exec();
            return result;
        });
    }
    deleteTasksByProjectId(projectId, session) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield task_model_1.Task.deleteMany({ project: projectId }).session(session);
            return result;
        });
    }
}
exports.TaskService = new Service();
