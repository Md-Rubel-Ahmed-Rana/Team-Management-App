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
exports.TaskService = void 0;
const task_model_1 = require("@/models/task.model");
const notification_service_1 = require("./notification.service");
const mongoose_1 = __importDefault(require("mongoose"));
const envConfig_1 = require("@/configurations/envConfig");
const enums_1 = require("enums");
const apiError_1 = __importDefault(require("@/shared/apiError"));
class Service {
    createTask(taskData) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const session = yield mongoose_1.default.startSession();
            session.startTransaction();
            try {
                const newTask = yield task_model_1.Task.create([taskData], { session });
                const populatedResult = yield newTask[0].populate([
                    {
                        path: "project",
                        model: "Project",
                        select: { name: 1, category: 1 },
                    },
                    {
                        path: "assignedTo",
                        model: "User",
                    },
                    {
                        path: "assignedBy",
                        model: "User",
                    },
                ]);
                if ((taskData === null || taskData === void 0 ? void 0 : taskData.assignedTo) && (taskData === null || taskData === void 0 ? void 0 : taskData.assignedBy)) {
                    const notifyObject = {
                        title: "You have been assigned a task",
                        type: enums_1.NotificationEnums.TASK_ASSIGNED,
                        content: `You have been assigned the task "${taskData === null || taskData === void 0 ? void 0 : taskData.name}" in the project "${(_a = populatedResult === null || populatedResult === void 0 ? void 0 : populatedResult.project) === null || _a === void 0 ? void 0 : _a.name}". Please review the task and start working on it as soon as possible.`,
                        receiver: taskData === null || taskData === void 0 ? void 0 : taskData.assignedTo,
                        sender: taskData === null || taskData === void 0 ? void 0 : taskData.assignedBy,
                        link: `${envConfig_1.config.app.frontendDomain}/tasks/${taskData === null || taskData === void 0 ? void 0 : taskData.project}?project_name=${(_b = populatedResult === null || populatedResult === void 0 ? void 0 : populatedResult.project) === null || _b === void 0 ? void 0 : _b.name}&project_id=${taskData === null || taskData === void 0 ? void 0 : taskData.project}&project_category=${(_c = populatedResult === null || populatedResult === void 0 ? void 0 : populatedResult.project) === null || _c === void 0 ? void 0 : _c.category}`,
                    };
                    yield notification_service_1.NotificationService.createNotification(notifyObject, session);
                }
                yield session.commitTransaction();
                session.endSession();
                const { _id, name, deadline, status, createdAt, updatedAt, assignedBy: { _id: creatorId, name: creatorName, profile_picture: creatorProfile, }, assignedTo: { _id: getterId, name: getterName, profile_picture: getterProfile, }, project: { _id: projectId, name: projectName, category }, } = populatedResult;
                const newTaskPayload = {
                    id: _id,
                    name: name,
                    deadline,
                    status,
                    createdAt,
                    updatedAt,
                    assignedBy: {
                        id: creatorId,
                        name: creatorName,
                        profile_picture: creatorProfile,
                    },
                    assignedTo: {
                        id: getterId,
                        name: getterName,
                        profile_picture: getterProfile,
                    },
                    project: {
                        id: projectId,
                        name: projectName,
                        category,
                    },
                };
                return newTaskPayload;
            }
            catch (error) {
                yield session.abortTransaction();
                session.endSession();
                throw error;
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
    updateTaskStatus(taskId, status, updaterId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
            const userProjection = {
                name: 1,
                profile_picture: 1,
                email: 1,
            };
            const session = yield mongoose_1.default.startSession();
            session.startTransaction();
            try {
                const result = yield task_model_1.Task.findByIdAndUpdate(taskId, { $set: { status } }, { new: true, session } // Ensure session is used here
                ).populate([
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
                    {
                        path: "project",
                        model: "Project",
                        select: { name: 1, category: 1 },
                    },
                ]);
                const notifyObject = {
                    title: "Task status changed",
                    type: enums_1.NotificationEnums.TASK_UPDATED,
                    content: "",
                    receiver: "",
                    sender: "",
                    link: `${envConfig_1.config.app.frontendDomain}/tasks/${result === null || result === void 0 ? void 0 : result.project}?project_name=${(_a = result === null || result === void 0 ? void 0 : result.project) === null || _a === void 0 ? void 0 : _a.name}&project_id=${(_b = result === null || result === void 0 ? void 0 : result.project) === null || _b === void 0 ? void 0 : _b.id}&project_category=${(_c = result === null || result === void 0 ? void 0 : result.project) === null || _c === void 0 ? void 0 : _c.category}`,
                };
                switch ((_d = result === null || result === void 0 ? void 0 : result.status) === null || _d === void 0 ? void 0 : _d.toLowerCase()) {
                    case "todo":
                        notifyObject.content = `The task "${result === null || result === void 0 ? void 0 : result.name}" in project "${(_e = result === null || result === void 0 ? void 0 : result.project) === null || _e === void 0 ? void 0 : _e.name}" has been assigned to you. Please review it and start working on it as soon as possible.`;
                        break;
                    case "ongoing":
                        notifyObject.content = `The task "${result === null || result === void 0 ? void 0 : result.name}" in project "${(_f = result === null || result === void 0 ? void 0 : result.project) === null || _f === void 0 ? void 0 : _f.name}" is now in progress. Keep up the good work!`;
                        break;
                    case "completed":
                        notifyObject.content = `The task "${result === null || result === void 0 ? void 0 : result.name}" in project "${(_g = result === null || result === void 0 ? void 0 : result.project) === null || _g === void 0 ? void 0 : _g.name}" has been marked as completed. Great job!`;
                        break;
                    default:
                        console.warn(`Unknown task status: ${result === null || result === void 0 ? void 0 : result.status}`);
                        break;
                }
                if (updaterId === ((_h = result === null || result === void 0 ? void 0 : result.assignedTo) === null || _h === void 0 ? void 0 : _h.id)) {
                    notifyObject.sender = (_j = result === null || result === void 0 ? void 0 : result.assignedTo) === null || _j === void 0 ? void 0 : _j.id;
                    notifyObject.receiver = (_k = result === null || result === void 0 ? void 0 : result.assignedBy) === null || _k === void 0 ? void 0 : _k.id;
                }
                else {
                    notifyObject.sender = (_l = result === null || result === void 0 ? void 0 : result.assignedBy) === null || _l === void 0 ? void 0 : _l.id;
                    notifyObject.receiver = (_m = result === null || result === void 0 ? void 0 : result.assignedTo) === null || _m === void 0 ? void 0 : _m.id;
                }
                yield notification_service_1.NotificationService.createNotification(notifyObject, session);
                yield session.commitTransaction();
                return { receiverId: notifyObject.receiver };
            }
            catch (error) {
                yield session.abortTransaction();
                throw new apiError_1.default(500, "Something went wrong to update task status");
            }
            finally {
                session.endSession();
            }
        });
    }
    updateTask(taskId, name, updaterId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
            const userProjection = {
                name: 1,
                profile_picture: 1,
                email: 1,
            };
            const session = yield mongoose_1.default.startSession();
            session.startTransaction();
            try {
                const result = yield task_model_1.Task.findByIdAndUpdate(taskId, { $set: { name } }, { new: true, session }).populate([
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
                const notifyObject = {
                    title: "Task name changed",
                    type: enums_1.NotificationEnums.TASK_UPDATED,
                    content: `The task name has been changed to "${result === null || result === void 0 ? void 0 : result.name}". Please take note of the updated task.`,
                    receiver: "",
                    sender: updaterId,
                    link: `${envConfig_1.config.app.frontendDomain}/tasks/${result === null || result === void 0 ? void 0 : result.project}?project_name=${(_a = result === null || result === void 0 ? void 0 : result.project) === null || _a === void 0 ? void 0 : _a.name}&project_id=${(_b = result === null || result === void 0 ? void 0 : result.project) === null || _b === void 0 ? void 0 : _b.id}`,
                };
                if (updaterId === ((_c = result === null || result === void 0 ? void 0 : result.assignedTo) === null || _c === void 0 ? void 0 : _c.id)) {
                    notifyObject.receiver = (_d = result === null || result === void 0 ? void 0 : result.assignedBy) === null || _d === void 0 ? void 0 : _d.id;
                }
                else {
                    notifyObject.receiver = (_e = result === null || result === void 0 ? void 0 : result.assignedTo) === null || _e === void 0 ? void 0 : _e.id;
                }
                yield notification_service_1.NotificationService.createNotification(notifyObject, session);
                yield session.commitTransaction();
                return { receiverId: notifyObject.receiver };
            }
            catch (error) {
                yield session.abortTransaction();
                throw new apiError_1.default(500, "Something went wrong updating the task");
            }
            finally {
                session.endSession();
            }
        });
    }
    deleteTask(taskId, updaterId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
            const session = yield mongoose_1.default.startSession();
            session.startTransaction();
            try {
                const isTaskExist = yield task_model_1.Task.findById(taskId).populate([
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
                yield task_model_1.Task.findByIdAndDelete(taskId, { session });
                if (isTaskExist) {
                    const notifyObject = {
                        title: "Task deleted",
                        type: enums_1.NotificationEnums.TASK_DELETED,
                        content: `The task "${isTaskExist === null || isTaskExist === void 0 ? void 0 : isTaskExist.name}" has been deleted from the project "${(_a = isTaskExist === null || isTaskExist === void 0 ? void 0 : isTaskExist.project) === null || _a === void 0 ? void 0 : _a.name}".`,
                        receiver: "",
                        sender: updaterId,
                        link: `${envConfig_1.config.app.frontendDomain}/projects/${(_b = isTaskExist === null || isTaskExist === void 0 ? void 0 : isTaskExist.project) === null || _b === void 0 ? void 0 : _b._id}`,
                    };
                    if (updaterId === ((_c = isTaskExist === null || isTaskExist === void 0 ? void 0 : isTaskExist.assignedTo) === null || _c === void 0 ? void 0 : _c.id)) {
                        notifyObject.receiver = (_d = isTaskExist === null || isTaskExist === void 0 ? void 0 : isTaskExist.assignedBy) === null || _d === void 0 ? void 0 : _d.id;
                    }
                    else {
                        notifyObject.receiver = (_e = isTaskExist === null || isTaskExist === void 0 ? void 0 : isTaskExist.assignedTo) === null || _e === void 0 ? void 0 : _e.id;
                    }
                    yield notification_service_1.NotificationService.createNotification(notifyObject);
                    return { receiverId: notifyObject.receiver };
                }
                yield session.commitTransaction();
            }
            catch (error) {
                yield session.abortTransaction();
                throw new apiError_1.default(500, "Something went wrong deleting the task");
            }
            finally {
                session.endSession();
            }
        });
    }
    deleteTasksByProjectId(projectId, session) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const userProjection = {
                name: 1,
                profile_picture: 1,
                email: 1,
            };
            // Find the tasks that belong to the project and populate assignedTo and assignedBy fields
            const tasks = yield task_model_1.Task.find({ project: projectId }).populate([
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
            // Delete the tasks
            yield task_model_1.Task.deleteMany({ project: projectId }).session(session);
            // Loop through the tasks and send notifications to the assigned members
            for (const task of tasks) {
                const notifyObject = {
                    title: "Task deleted",
                    type: enums_1.NotificationEnums.TASK_DELETED,
                    content: `The task "${task === null || task === void 0 ? void 0 : task.name}" has been deleted. Please take note of the change.`,
                    receiver: (_a = task === null || task === void 0 ? void 0 : task.assignedTo) === null || _a === void 0 ? void 0 : _a._id,
                    sender: (_b = task === null || task === void 0 ? void 0 : task.assignedBy) === null || _b === void 0 ? void 0 : _b._id,
                    link: "",
                };
                // Create the notification for the assignedTo member
                yield notification_service_1.NotificationService.createNotification(notifyObject, session);
            }
        });
    }
}
exports.TaskService = new Service();
