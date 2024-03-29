"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapper = void 0;
const classes_1 = require("@automapper/classes");
const core_1 = require("@automapper/core");
exports.mapper = (0, core_1.createMapper)({
    strategyInitializer: (0, classes_1.classes)(),
});
