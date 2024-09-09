"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const package_service_1 = require("@/services/package.service");
const checkPackageAndGetCurrent = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const ixPackageExist = yield package_service_1.PackageService.isPackageExist(userId);
    return (_a = ixPackageExist === null || ixPackageExist === void 0 ? void 0 : ixPackageExist.packages) === null || _a === void 0 ? void 0 : _a.find((pkg) => (pkg === null || pkg === void 0 ? void 0 : pkg.isCurrent) === true);
});
exports.default = checkPackageAndGetCurrent;
