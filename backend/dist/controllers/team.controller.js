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
exports.TeamController = void 0;
const deletePreviousFileFromCloudinary_1 = require("@/utils/deletePreviousFileFromCloudinary");
const team_service_1 = require("@/services/team.service");
const rootController_1 = __importDefault(require("@/shared/rootController"));
const getCloudinaryFilePublicIdFromUrl_1 = __importDefault(require("@/utils/getCloudinaryFilePublicIdFromUrl"));
const http_status_1 = __importDefault(require("http-status"));
class Controller extends rootController_1.default {
    constructor() {
        super(...arguments);
        this.createTeam = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield team_service_1.TeamService.createTeam(Object.assign(Object.assign({}, req.body), { image: req.link || "" }));
            this.apiResponse(res, {
                statusCode: http_status_1.default.CREATED,
                success: true,
                message: "team created successfully",
                data: result,
            });
        }));
        this.getActiveMembers = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.teamId;
            const result = yield team_service_1.TeamService.getActiveMembers(id);
            this.apiResponse(res, {
                statusCode: http_status_1.default.OK,
                success: true,
                message: "Team members found",
                data: result,
            });
        }));
        this.myTeams = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.adminId;
            const result = yield team_service_1.TeamService.myTeams(id);
            this.apiResponse(res, {
                statusCode: http_status_1.default.OK,
                success: true,
                message: "Teams found",
                data: result,
            });
        }));
        this.joinedTeams = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.memberId;
            const result = yield team_service_1.TeamService.joinedTeams(id);
            this.apiResponse(res, {
                statusCode: http_status_1.default.OK,
                success: true,
                message: "Teams found",
                data: result,
            });
        }));
        this.getTeam = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield team_service_1.TeamService.getTeam(req.params.id);
            this.apiResponse(res, {
                statusCode: http_status_1.default.OK,
                success: true,
                message: "Team found",
                data: result,
            });
        }));
        this.updateTeam = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (req.link) {
                const team = yield team_service_1.TeamService.getTeamById(id);
                const teamLogo = team === null || team === void 0 ? void 0 : team.image;
                if (teamLogo) {
                    const public_id = (0, getCloudinaryFilePublicIdFromUrl_1.default)(teamLogo);
                    yield (0, deletePreviousFileFromCloudinary_1.deleteSingleFileFromCloudinary)(public_id);
                }
                const result = yield team_service_1.TeamService.updateTeam(id, Object.assign(Object.assign({}, req.body), { image: req.link }));
                this.apiResponse(res, {
                    statusCode: http_status_1.default.OK,
                    success: true,
                    message: "Team updated successfully",
                    data: result,
                });
            }
            else {
                const result = yield team_service_1.TeamService.updateTeam(id, req.body);
                this.apiResponse(res, {
                    statusCode: http_status_1.default.OK,
                    success: true,
                    message: "Team updated successfully",
                    data: result,
                });
            }
        }));
        this.deleteTeam = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield team_service_1.TeamService.deleteTeam(req.params.id);
            this.apiResponse(res, {
                statusCode: http_status_1.default.OK,
                success: true,
                message: "Team deleted successfully",
                data: result,
            });
        }));
        this.removeMember = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const teamId = req.params.teamId;
            const memberId = req.params.memberId;
            const result = yield team_service_1.TeamService.removeMember(teamId, memberId);
            this.apiResponse(res, {
                statusCode: http_status_1.default.OK,
                success: true,
                message: "Team member removed successfully",
                data: result,
            });
        }));
    }
}
exports.TeamController = new Controller();
