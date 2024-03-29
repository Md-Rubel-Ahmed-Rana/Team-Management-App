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
exports.FileEntity = exports.LinkEntity = exports.ImageEntity = exports.PlanFeature = void 0;
const classes_1 = require("@automapper/classes");
class PlanFeature {
}
exports.PlanFeature = PlanFeature;
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], PlanFeature.prototype, "feature", void 0);
class ImageEntity {
}
exports.ImageEntity = ImageEntity;
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], ImageEntity.prototype, "image", void 0);
class LinkEntity {
}
exports.LinkEntity = LinkEntity;
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], LinkEntity.prototype, "link", void 0);
class FileEntity {
}
exports.FileEntity = FileEntity;
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], FileEntity.prototype, "file", void 0);
