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
exports.MessageEntity = void 0;
const classes_1 = require("@automapper/classes");
const util_entity_1 = require("./util.entity");
const user_entity_1 = require("./user.entity");
const team_entity_1 = require("./team.entity");
class MessageEntity {
    constructor() {
        this.images = [];
        this.files = [];
        this.links = [];
    }
}
exports.MessageEntity = MessageEntity;
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], MessageEntity.prototype, "id", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], MessageEntity.prototype, "type", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], MessageEntity.prototype, "text", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => team_entity_1.TeamEntity),
    __metadata("design:type", team_entity_1.TeamEntity)
], MessageEntity.prototype, "conversationId", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => user_entity_1.UserEntity),
    __metadata("design:type", user_entity_1.UserEntity)
], MessageEntity.prototype, "poster", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => [util_entity_1.ImageEntity]),
    __metadata("design:type", Array)
], MessageEntity.prototype, "images", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => [util_entity_1.FileEntity]),
    __metadata("design:type", Array)
], MessageEntity.prototype, "files", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => [util_entity_1.LinkEntity]),
    __metadata("design:type", Array)
], MessageEntity.prototype, "links", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Date)
], MessageEntity.prototype, "createdAt", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Date)
], MessageEntity.prototype, "updatedAt", void 0);
