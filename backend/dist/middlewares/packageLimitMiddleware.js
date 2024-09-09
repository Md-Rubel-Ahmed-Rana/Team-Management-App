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
const project_service_1 = require("@/services/project.service");
const team_service_1 = require("@/services/team.service");
const checkPackageAndGetCurrent_1 = __importDefault(require("@/utils/checkPackageAndGetCurrent"));
const http_status_1 = __importDefault(require("http-status"));
const packageLimitMiddleware = {
    teamCreate: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const userId = req.id;
        console.log({ userId });
        const currentPackage = yield (0, checkPackageAndGetCurrent_1.default)(userId);
        if (currentPackage) {
            const myTeams = yield team_service_1.TeamService.getMyTeams(userId);
            const teamCount = ((_b = (_a = currentPackage === null || currentPackage === void 0 ? void 0 : currentPackage.limit) === null || _a === void 0 ? void 0 : _a.team) === null || _b === void 0 ? void 0 : _b.teamCount) || 0;
            // Early return to avoid nesting
<<<<<<< HEAD
            if (!myTeams || myTeams.length < teamCount) {
=======
            if (!myTeams || (myTeams === null || myTeams === void 0 ? void 0 : myTeams.length) < teamCount) {
>>>>>>> 1c53476927925accfedd745a99cc27fa87b81c2d
                return next();
            }
            return res.status(http_status_1.default.UNAUTHORIZED).json({
                statusCode: http_status_1.default.UNAUTHORIZED,
                success: false,
                message: "You have exceeded the maximum team creation limit. Please upgrade your plan.",
            });
        }
        else {
            return res.status(http_status_1.default.UNAUTHORIZED).json({
                statusCode: http_status_1.default.UNAUTHORIZED,
                success: false,
                message: "You did not purchase any plan yet. Please purchase a plan to create and manage teams, projects and tasks.",
            });
        }
    }),
    teamMemberAdd: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
<<<<<<< HEAD
        var _a, _b, _c, _d, _e;
=======
        var _a, _b, _c, _d;
>>>>>>> 1c53476927925accfedd745a99cc27fa87b81c2d
        const userId = req.id;
        const teamId = req.params.teamId;
        const currentPackage = yield (0, checkPackageAndGetCurrent_1.default)(userId);
        if (currentPackage) {
            const myTeams = yield team_service_1.TeamService.getMyTeams(userId);
<<<<<<< HEAD
            const teamCount = ((_b = (_a = currentPackage === null || currentPackage === void 0 ? void 0 : currentPackage.limit) === null || _a === void 0 ? void 0 : _a.team) === null || _b === void 0 ? void 0 : _b.teamCount) || 0;
            if (!myTeams || myTeams.length < teamCount) {
                return next();
            }
            const team = myTeams.find((team) => team.id === teamId);
            const teamMemberCount = ((_d = (_c = currentPackage === null || currentPackage === void 0 ? void 0 : currentPackage.limit) === null || _c === void 0 ? void 0 : _c.team) === null || _d === void 0 ? void 0 : _d.memberCount) || 0;
            if (team && ((_e = team === null || team === void 0 ? void 0 : team.activeMembers) === null || _e === void 0 ? void 0 : _e.length) >= teamMemberCount) {
=======
            const team = myTeams.find((team) => (team === null || team === void 0 ? void 0 : team.id) === teamId);
            const teamMemberCount = ((_b = (_a = currentPackage === null || currentPackage === void 0 ? void 0 : currentPackage.limit) === null || _a === void 0 ? void 0 : _a.team) === null || _b === void 0 ? void 0 : _b.memberCount) || 0;
            console.log({
                teamMemberCount,
                activeMembers: (_c = team === null || team === void 0 ? void 0 : team.activeMembers) === null || _c === void 0 ? void 0 : _c.length,
            });
            if (team && ((_d = team === null || team === void 0 ? void 0 : team.activeMembers) === null || _d === void 0 ? void 0 : _d.length) >= teamMemberCount) {
                console.log("// prevent to add new member");
>>>>>>> 1c53476927925accfedd745a99cc27fa87b81c2d
                return res.status(http_status_1.default.UNAUTHORIZED).json({
                    statusCode: http_status_1.default.UNAUTHORIZED,
                    success: false,
                    message: "You have exceeded the maximum team member limit. Please upgrade your plan.",
                });
            }
<<<<<<< HEAD
=======
            console.log("// Allow to add new member");
>>>>>>> 1c53476927925accfedd745a99cc27fa87b81c2d
            return next();
        }
        else {
            return res.status(http_status_1.default.UNAUTHORIZED).json({
                statusCode: http_status_1.default.UNAUTHORIZED,
                success: false,
                message: "You did not purchase any plan yet. Please purchase a plan to create and manage teams, projects and tasks.",
            });
        }
    }),
    projectCreate: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const userId = req.id;
        const currentPackage = yield (0, checkPackageAndGetCurrent_1.default)(userId);
        if (currentPackage) {
            const myProjects = yield project_service_1.ProjectService.myProjects(userId);
            const projectCount = ((_a = currentPackage === null || currentPackage === void 0 ? void 0 : currentPackage.limit) === null || _a === void 0 ? void 0 : _a.projectCount) || 0;
<<<<<<< HEAD
            if (!myProjects || myProjects.length < projectCount) {
                return next();
            }
=======
            console.log({ projectCount, myProjects: myProjects.length });
            if (!myProjects || myProjects.length < projectCount) {
                console.log("Allow user to create project");
                return next();
            }
            console.log("Prevent user to create project");
>>>>>>> 1c53476927925accfedd745a99cc27fa87b81c2d
            return res.status(http_status_1.default.UNAUTHORIZED).json({
                statusCode: http_status_1.default.UNAUTHORIZED,
                success: false,
                message: "You have exceeded the maximum project creation limit. Please upgrade your plan.",
            });
        }
        else {
            return res.status(http_status_1.default.UNAUTHORIZED).json({
                statusCode: http_status_1.default.UNAUTHORIZED,
                success: false,
                message: "You did not purchase any plan yet. Please purchase a plan to create and manage teams, projects and tasks.",
            });
        }
    }),
};
exports.default = packageLimitMiddleware;
