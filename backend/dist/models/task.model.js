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
exports.Task = void 0;
const mongoose_1 = require("mongoose");
const project_model_1 = require("./project.model");
const cache_service_1 = require("@/services/cache.service");
const project_service_1 = require("@/services/project.service");
const taskSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    deadline: {
        type: String,
    },
    project: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Project",
    },
    assignedTo: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    assignedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    status: {
        type: String,
        enum: ["Todo", "Ongoing", "Completed"],
        default: "Todo",
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        versionKey: false,
    },
});
// Middleware to increment project in the Team schema
taskSchema.post("save", function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        const updatedProject = yield project_model_1.Project.findByIdAndUpdate(doc.project, {
            $inc: { tasks: 1 },
        }, { new: true });
        const dtoData = project_service_1.ProjectService.projectSanitizer(updatedProject);
        yield cache_service_1.CacheServiceInstance.project.updateProjectInCache(dtoData);
    });
});
exports.Task = (0, mongoose_1.model)("Task", taskSchema);
