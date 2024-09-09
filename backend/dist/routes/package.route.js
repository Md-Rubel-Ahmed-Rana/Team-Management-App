"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageRoutes = void 0;
const package_controller_1 = require("@/controllers/package.controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/my-package:/userId", package_controller_1.PackageController.getMyPackage);
exports.PackageRoutes = router;
