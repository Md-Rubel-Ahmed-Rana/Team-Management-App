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
const mapper_1 = require("../mapper");
const task_entity_1 = require("@/entities/task.entity");
const get_1 = require("@/dto/task/get");
const update_1 = require("@/dto/task/update");
const delete_1 = require("@/dto/task/delete");
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
                const data = mapper_1.mapper.map(result, task_entity_1.TaskEntity, get_1.GetTaskDTO);
                return { notification, data };
            }
        });
    }
    getTasksByProjectId(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield task_model_1.Task.find({ project: projectId }).populate([
                {
                    path: "assignedTo",
                    model: "User",
                },
                {
                    path: "assignedBy",
                    model: "User",
                },
            ]);
            const mappedData = mapper_1.mapper.mapArray(result, task_entity_1.TaskEntity, get_1.GetTaskDTO);
            return mappedData;
        });
    }
    updateTaskStatus(taskId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield task_model_1.Task.findByIdAndUpdate(taskId, { $set: { status } }, { new: true });
            const mappedData = mapper_1.mapper.map(result, task_entity_1.TaskEntity, update_1.UpdateTaskDTO);
            return mappedData;
        });
    }
    updateTask(taskId, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield task_model_1.Task.findByIdAndUpdate(taskId, { $set: { name } }, { new: true });
            const mappedData = mapper_1.mapper.map(result, task_entity_1.TaskEntity, update_1.UpdateTaskDTO);
            return mappedData;
        });
    }
    deleteTask(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield task_model_1.Task.findByIdAndDelete(taskId).exec();
            const mappedData = mapper_1.mapper.map(result, task_entity_1.TaskEntity, delete_1.DeleteTaskDTO);
            return mappedData;
        });
    }
}
exports.TaskService = new Service();
