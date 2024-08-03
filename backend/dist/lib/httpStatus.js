"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpStatusInstance = void 0;
const http_status_1 = __importDefault(require("http-status"));
class HttpStatus {
    constructor() {
        Object.keys(http_status_1.default).forEach((key) => {
            this[key] = http_status_1.default[key];
        });
    }
}
exports.HttpStatusInstance = new HttpStatus();
