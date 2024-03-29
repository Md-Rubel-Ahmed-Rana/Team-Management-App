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
exports.CreatePaymentDTO = void 0;
const plan_entity_1 = require("@/entities/plan.entity");
const user_entity_1 = require("@/entities/user.entity");
const classes_1 = require("@automapper/classes");
class CreatePaymentDTO {
}
exports.CreatePaymentDTO = CreatePaymentDTO;
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], CreatePaymentDTO.prototype, "id", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => user_entity_1.UserEntity),
    __metadata("design:type", user_entity_1.UserEntity)
], CreatePaymentDTO.prototype, "user", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], CreatePaymentDTO.prototype, "paymentAmount", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => plan_entity_1.PlanEntity),
    __metadata("design:type", plan_entity_1.PlanEntity)
], CreatePaymentDTO.prototype, "package", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], CreatePaymentDTO.prototype, "sessionId", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], CreatePaymentDTO.prototype, "status", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Date)
], CreatePaymentDTO.prototype, "createdAt", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Date)
], CreatePaymentDTO.prototype, "updatedAt", void 0);
