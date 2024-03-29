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
exports.GetMessageDTO = void 0;
const util_entity_1 = require("@/entities/util.entity");
const classes_1 = require("@automapper/classes");
const get_1 = require("../user/get");
const team_entity_1 = require("@/entities/team.entity");
class GetMessageDTO {
    constructor() {
        this.images = [];
        this.files = [];
        this.links = [];
    }
}
exports.GetMessageDTO = GetMessageDTO;
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], GetMessageDTO.prototype, "id", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], GetMessageDTO.prototype, "type", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], GetMessageDTO.prototype, "text", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => team_entity_1.TeamEntity),
    __metadata("design:type", team_entity_1.TeamEntity)
], GetMessageDTO.prototype, "conversationId", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => get_1.GetUserDTO),
    __metadata("design:type", get_1.GetUserDTO)
], GetMessageDTO.prototype, "poster", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => [util_entity_1.ImageEntity]),
    __metadata("design:type", Array)
], GetMessageDTO.prototype, "images", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => [util_entity_1.FileEntity]),
    __metadata("design:type", Array)
], GetMessageDTO.prototype, "files", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => [util_entity_1.LinkEntity]),
    __metadata("design:type", Array)
], GetMessageDTO.prototype, "links", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Date)
], GetMessageDTO.prototype, "createdAt", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Date)
], GetMessageDTO.prototype, "updatedAt", void 0);
