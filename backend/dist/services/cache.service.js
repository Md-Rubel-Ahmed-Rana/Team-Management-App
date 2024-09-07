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
exports.CacheServiceInstance = void 0;
const redis_service_1 = require("./redis.service");
class CacheService {
    constructor() {
        this.cacheKeys = {
            user: "users",
            team: "teams",
            project: "projects",
        };
        this.user = {
            getAllUsersFromCache: () => __awaiter(this, void 0, void 0, function* () {
                return yield this.getAll(this.cacheKeys.user);
            }),
            getSingleUserFromCache: (userId) => __awaiter(this, void 0, void 0, function* () {
                return yield this.getOne(this.cacheKeys.user, userId);
            }),
            setAllUsersToCache: (users) => __awaiter(this, void 0, void 0, function* () {
                yield this.setAll(this.cacheKeys.user, users);
            }),
            addNewUserToCache: (newUser) => __awaiter(this, void 0, void 0, function* () {
                yield this.addItem(this.cacheKeys.user, newUser);
            }),
            updateUserInCache: (updatedUser) => __awaiter(this, void 0, void 0, function* () {
                yield this.updateItem(this.cacheKeys.user, updatedUser);
            }),
            deleteUserFromCache: (userId) => __awaiter(this, void 0, void 0, function* () {
                yield this.deleteItem(this.cacheKeys.user, userId);
            }),
            deleteAllUserFromCache: () => __awaiter(this, void 0, void 0, function* () {
                yield this.deleteAll(this.cacheKeys.user);
            }),
        };
        this.team = {
            getAllTeamsFromCache: () => __awaiter(this, void 0, void 0, function* () {
                return yield this.getAll(this.cacheKeys.team);
            }),
            getMyTeamsFromCache: (adminId) => __awaiter(this, void 0, void 0, function* () {
                const teams = yield this.getAll(this.cacheKeys.team);
                const myTeams = teams === null || teams === void 0 ? void 0 : teams.filter((team) => { var _a; return ((_a = team === null || team === void 0 ? void 0 : team.admin) === null || _a === void 0 ? void 0 : _a.id) === adminId; });
                return myTeams;
            }),
            joinedTeams: (memberId) => __awaiter(this, void 0, void 0, function* () {
                const teams = yield this.getAll(this.cacheKeys.team);
                const myTeams = teams === null || teams === void 0 ? void 0 : teams.filter((team) => { var _a; return (_a = team === null || team === void 0 ? void 0 : team.activeMembers) === null || _a === void 0 ? void 0 : _a.some((member) => (member === null || member === void 0 ? void 0 : member.id) === memberId); });
                return myTeams;
            }),
            getSingleTeamFromCache: (teamId) => __awaiter(this, void 0, void 0, function* () {
                return yield this.getOne(this.cacheKeys.team, teamId);
            }),
            setAllTeamsToCache: (teams) => __awaiter(this, void 0, void 0, function* () {
                yield this.setAll(this.cacheKeys.team, teams);
            }),
            addNewTeamToCache: (newTeam) => __awaiter(this, void 0, void 0, function* () {
                yield this.addItem(this.cacheKeys.team, newTeam);
            }),
            updateTeamInCache: (updatedTeam) => __awaiter(this, void 0, void 0, function* () {
                yield this.updateItem(this.cacheKeys.team, updatedTeam);
            }),
            deleteTeamFromCache: (teamId) => __awaiter(this, void 0, void 0, function* () {
                yield this.deleteItem(this.cacheKeys.team, teamId);
            }),
            deleteAllTeamFromCache: () => __awaiter(this, void 0, void 0, function* () {
                yield this.deleteAll(this.cacheKeys.team);
            }),
        };
        this.project = {
            getAllProjectsFromCache: () => __awaiter(this, void 0, void 0, function* () {
                return yield this.getAll(this.cacheKeys.project);
            }),
            deleteAllProjectFromCache: () => __awaiter(this, void 0, void 0, function* () {
                yield this.deleteAll(this.cacheKeys.project);
            }),
            getMyProjectsFromCache: (userId) => __awaiter(this, void 0, void 0, function* () {
                const projects = yield this.getAll(this.cacheKeys.project);
                const myProjects = projects === null || projects === void 0 ? void 0 : projects.filter((project) => (project === null || project === void 0 ? void 0 : project.user) === userId);
                return myProjects;
            }),
            getAssignedProjectsFromCache: (memberId) => __awaiter(this, void 0, void 0, function* () {
                const projects = yield this.getAll(this.cacheKeys.project);
                const assignedProjects = projects === null || projects === void 0 ? void 0 : projects.filter((project) => { var _a; return (_a = project === null || project === void 0 ? void 0 : project.members) === null || _a === void 0 ? void 0 : _a.some((member) => (member === null || member === void 0 ? void 0 : member.id) === memberId); });
                return assignedProjects;
            }),
            getSingleProjectFromCache: (projectId) => __awaiter(this, void 0, void 0, function* () {
                return yield this.getOne(this.cacheKeys.project, projectId);
            }),
            setAllProjectsToCache: (projects) => __awaiter(this, void 0, void 0, function* () {
                yield this.setAll(this.cacheKeys.project, projects);
            }),
            addNewProjectToCache: (newProject) => __awaiter(this, void 0, void 0, function* () {
                yield this.addItem(this.cacheKeys.project, newProject);
            }),
            updateProjectInCache: (updatedProject) => __awaiter(this, void 0, void 0, function* () {
                yield this.updateItem(this.cacheKeys.project, updatedProject);
            }),
            deleteProjectFromCache: (projectId) => __awaiter(this, void 0, void 0, function* () {
                yield this.deleteItem(this.cacheKeys.project, projectId);
            }),
        };
    }
    getAll(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield redis_service_1.RedisService.get(key);
            return data;
        });
    }
    getOne(key, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield this.getAll(key);
            if (items) {
                const item = items.find((item) => item.id === id);
                return item || null;
            }
            return null;
        });
    }
    setAll(key, items) {
        return __awaiter(this, void 0, void 0, function* () {
            yield redis_service_1.RedisService.set(key, items);
        });
    }
    deleteAll(key) {
        return __awaiter(this, void 0, void 0, function* () {
            yield redis_service_1.RedisService.delete(key);
        });
    }
    addItem(key, newItem) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield this.getAll(key);
            if (items) {
                const updatedItems = [...items, newItem];
                yield this.setAll(key, updatedItems);
            }
            else {
                yield this.setAll(key, [newItem]);
            }
        });
    }
    updateItem(key, updatedItem) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield this.getAll(key);
            if (items) {
                const updatedItems = items.map((item) => item.id === updatedItem.id ? updatedItem : item);
                yield this.setAll(key, updatedItems);
            }
            else {
                yield this.setAll(key, [updatedItem]);
            }
        });
    }
    deleteItem(key, itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield this.getAll(key);
            if (items) {
                const updatedItems = items.filter((item) => item.id !== itemId);
                yield this.setAll(key, updatedItems);
            }
        });
    }
}
exports.CacheServiceInstance = new CacheService();
