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
exports.CreateTaskDTO = void 0;
const classes_1 = require("@automapper/classes");
const project_entity_1 = require("@/entities/project.entity");
const user_entity_1 = require("@/entities/user.entity");
class CreateTaskDTO {
}
exports.CreateTaskDTO = CreateTaskDTO;
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], CreateTaskDTO.prototype, "id", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], CreateTaskDTO.prototype, "name", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], CreateTaskDTO.prototype, "deadline", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => user_entity_1.UserEntity),
    __metadata("design:type", user_entity_1.UserEntity)
], CreateTaskDTO.prototype, "assignedTo", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => user_entity_1.UserEntity),
    __metadata("design:type", user_entity_1.UserEntity)
], CreateTaskDTO.prototype, "assignedBy", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => project_entity_1.ProjectEntity),
    __metadata("design:type", project_entity_1.ProjectEntity)
], CreateTaskDTO.prototype, "project", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], CreateTaskDTO.prototype, "status", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Date)
], CreateTaskDTO.prototype, "createdAt", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Date)
], CreateTaskDTO.prototype, "updatedAt", void 0);
