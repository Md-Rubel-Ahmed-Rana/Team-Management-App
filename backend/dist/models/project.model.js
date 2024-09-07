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
exports.Project = void 0;
const mongoose_1 = require("mongoose");
const team_model_1 = __importDefault(require("./team.model"));
const team_service_1 = require("@/services/team.service");
const cache_service_1 = require("@/services/cache.service");
const projectSchema = new mongoose_1.Schema({
    team: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Team",
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    leaveRequests: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
            default: [],
        },
    ],
    members: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User", default: [] }],
    tasks: { type: Number, default: 0 },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        versionKey: false,
    },
});
// Middleware to increment project in the Team schema
projectSchema.post("save", function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        const updatedProject = yield team_model_1.default.findByIdAndUpdate(doc.team, {
            $push: { projects: doc._id },
        }, { new: true }).populate(team_service_1.teamPopulate);
        const dtoData = team_service_1.TeamService.teamSanitizer(updatedProject);
        yield cache_service_1.CacheServiceInstance.team.updateTeamInCache(dtoData);
    });
});
exports.Project = (0, mongoose_1.model)("Project", projectSchema);
