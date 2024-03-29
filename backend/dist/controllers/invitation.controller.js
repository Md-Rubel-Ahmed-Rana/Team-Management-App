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
exports.InvitationController = void 0;
const invitation_service_1 = require("@/services/invitation.service");
const rootController_1 = __importDefault(require("@/shared/rootController"));
const http_status_1 = __importDefault(require("http-status"));
class Controller extends rootController_1.default {
    constructor() {
        super(...arguments);
        this.sendInvitation = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const teamId = req.params.teamId;
            const memberId = req.params.memberId;
            const result = yield invitation_service_1.InvitationService.sendInvitation(teamId, memberId);
            this.apiResponse(res, {
                statusCode: http_status_1.default.OK,
                success: true,
                message: "Invitation sent successfully!",
                data: result,
            });
        }));
        this.pendingInvitation = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const memberId = req.params.memberId;
            const result = yield invitation_service_1.InvitationService.pendingInvitation(memberId);
            this.apiResponse(res, {
                statusCode: http_status_1.default.OK,
                success: true,
                message: "Pending invitations found successfully!",
                data: result,
            });
        }));
        this.rejectInvitation = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const teamId = req.params.teamId;
            const memberId = req.params.memberId;
            const result = yield invitation_service_1.InvitationService.rejectInvitation(teamId, memberId);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Invitation rejected successfully!",
                data: result,
            });
        }));
        this.acceptInvitation = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const teamId = req.params.teamId;
            const memberId = req.params.memberId;
            const result = yield invitation_service_1.InvitationService.acceptInvitation(teamId, memberId);
            this.apiResponse(res, {
                statusCode: 200,
                success: true,
                message: "Invitation accepted successfully!",
                data: result,
            });
        }));
    }
}
exports.InvitationController = new Controller();
