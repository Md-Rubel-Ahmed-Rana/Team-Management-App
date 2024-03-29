"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTeamDTO = void 0;
const user_entity_1 = require("@/entities/user.entity");
const classes_1 = require("@automapper/classes");
class CreateTeamDTO {
    constructor() {
        this.activeMembers = [];
        this.pendingMembers = [];
    }
}
exports.CreateTeamDTO = CreateTeamDTO;
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], CreateTeamDTO.prototype, "id", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], CreateTeamDTO.prototype, "name", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], CreateTeamDTO.prototype, "category", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], CreateTeamDTO.prototype, "description", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], CreateTeamDTO.prototype, "image", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => user_entity_1.UserEntity),
    __metadata("design:type", user_entity_1.UserEntity)
], CreateTeamDTO.prototype, "admin", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => [user_entity_1.UserEntity]),
    __metadata("design:type", Array)
], CreateTeamDTO.prototype, "activeMembers", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => [user_entity_1.UserEntity]),
    __metadata("design:type", Array)
], CreateTeamDTO.prototype, "pendingMembers", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Date)
], CreateTeamDTO.prototype, "createdAt", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Date)
], CreateTeamDTO.prototype, "updatedAt", void 0);
