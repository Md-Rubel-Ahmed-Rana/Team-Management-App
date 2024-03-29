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
exports.GetPlanDTO = void 0;
const util_entity_1 = require("@/entities/util.entity");
const classes_1 = require("@automapper/classes");
class GetPlanDTO {
    constructor() {
        this.features = [];
    }
}
exports.GetPlanDTO = GetPlanDTO;
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], GetPlanDTO.prototype, "id", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], GetPlanDTO.prototype, "plan", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], GetPlanDTO.prototype, "price", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => [util_entity_1.PlanFeature]),
    __metadata("design:type", Array)
], GetPlanDTO.prototype, "features", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Date)
], GetPlanDTO.prototype, "createdAt", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Date)
], GetPlanDTO.prototype, "updatedAt", void 0);
