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
exports.GetTeamDTO = void 0;
const classes_1 = require("@automapper/classes");
const get_1 = require("../user/get");
class GetTeamDTO {
    constructor() {
        this.activeMembers = [];
        this.pendingMembers = [];
    }
}
exports.GetTeamDTO = GetTeamDTO;
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], GetTeamDTO.prototype, "id", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], GetTeamDTO.prototype, "name", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], GetTeamDTO.prototype, "category", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], GetTeamDTO.prototype, "description", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], GetTeamDTO.prototype, "image", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => get_1.GetUserDTO),
    __metadata("design:type", get_1.GetUserDTO)
], GetTeamDTO.prototype, "admin", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => [get_1.GetUserDTO]),
    __metadata("design:type", Array)
], GetTeamDTO.prototype, "activeMembers", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => [get_1.GetUserDTO]),
    __metadata("design:type", Array)
], GetTeamDTO.prototype, "pendingMembers", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Date)
], GetTeamDTO.prototype, "createdAt", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Date)
], GetTeamDTO.prototype, "updatedAt", void 0);
