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
exports.CreateMessageDTO = void 0;
const team_entity_1 = require("@/entities/team.entity");
const user_entity_1 = require("@/entities/user.entity");
const util_entity_1 = require("@/entities/util.entity");
const classes_1 = require("@automapper/classes");
class CreateMessageDTO {
    constructor() {
        this.images = [];
        this.files = [];
        this.links = [];
    }
}
exports.CreateMessageDTO = CreateMessageDTO;
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], CreateMessageDTO.prototype, "id", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], CreateMessageDTO.prototype, "type", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], CreateMessageDTO.prototype, "text", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => team_entity_1.TeamEntity),
    __metadata("design:type", team_entity_1.TeamEntity)
], CreateMessageDTO.prototype, "conversationId", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => user_entity_1.UserEntity),
    __metadata("design:type", user_entity_1.UserEntity)
], CreateMessageDTO.prototype, "poster", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => [util_entity_1.ImageEntity]),
    __metadata("design:type", Array)
], CreateMessageDTO.prototype, "images", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => [util_entity_1.FileEntity]),
    __metadata("design:type", Array)
], CreateMessageDTO.prototype, "files", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => [util_entity_1.LinkEntity]),
    __metadata("design:type", Array)
], CreateMessageDTO.prototype, "links", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Date)
], CreateMessageDTO.prototype, "createdAt", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Date)
], CreateMessageDTO.prototype, "updatedAt", void 0);
