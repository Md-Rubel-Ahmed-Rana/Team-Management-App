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
exports.TeamEntity = void 0;
const classes_1 = require("@automapper/classes");
const user_entity_1 = require("./user.entity");
class TeamEntity {
    constructor() {
        this.activeMembers = [];
        this.pendingMembers = [];
    }
}
exports.TeamEntity = TeamEntity;
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], TeamEntity.prototype, "id", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], TeamEntity.prototype, "name", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], TeamEntity.prototype, "category", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], TeamEntity.prototype, "description", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], TeamEntity.prototype, "image", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => user_entity_1.UserEntity),
    __metadata("design:type", user_entity_1.UserEntity)
], TeamEntity.prototype, "admin", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => [user_entity_1.UserEntity]),
    __metadata("design:type", Array)
], TeamEntity.prototype, "activeMembers", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => [user_entity_1.UserEntity]),
    __metadata("design:type", Array)
], TeamEntity.prototype, "pendingMembers", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Date)
], TeamEntity.prototype, "createdAt", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Date)
], TeamEntity.prototype, "updatedAt", void 0);
