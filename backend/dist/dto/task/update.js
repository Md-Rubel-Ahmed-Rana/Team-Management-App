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
exports.UpdateTaskDTO = void 0;
const classes_1 = require("@automapper/classes");
const get_1 = require("../user/get");
const project_entity_1 = require("@/entities/project.entity");
class UpdateTaskDTO {
}
exports.UpdateTaskDTO = UpdateTaskDTO;
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UpdateTaskDTO.prototype, "id", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UpdateTaskDTO.prototype, "name", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UpdateTaskDTO.prototype, "deadline", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => get_1.GetUserDTO),
    __metadata("design:type", get_1.GetUserDTO)
], UpdateTaskDTO.prototype, "assignedTo", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => get_1.GetUserDTO),
    __metadata("design:type", get_1.GetUserDTO)
], UpdateTaskDTO.prototype, "assignedBy", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => project_entity_1.ProjectEntity),
    __metadata("design:type", project_entity_1.ProjectEntity)
], UpdateTaskDTO.prototype, "project", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], UpdateTaskDTO.prototype, "status", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Date)
], UpdateTaskDTO.prototype, "createdAt", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Date)
], UpdateTaskDTO.prototype, "updatedAt", void 0);
