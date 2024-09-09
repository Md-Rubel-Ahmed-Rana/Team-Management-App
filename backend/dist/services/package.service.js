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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageService = void 0;
const plan_service_1 = require("./plan.service");
const apiError_1 = __importDefault(require("@/shared/apiError"));
const packages_1 = require("@/constants/packages");
const http_status_1 = __importDefault(require("http-status"));
const package_model_1 = require("@/models/package.model");
class Service {
    addNewPackage(userId, planId, paymentId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            console.log({ userId, planId, paymentId });
            // Fetch the plan first and handle not found
            const plan = yield plan_service_1.PlanService.getSinglePlan(planId);
            if (!plan) {
                throw new apiError_1.default(http_status_1.default.NOT_FOUND, "Plan not found");
            }
            const planName = (_a = plan.plan) === null || _a === void 0 ? void 0 : _a.toLowerCase();
            const packageData = packages_1.packagesData[planName];
            const session = yield package_model_1.Package.startSession();
            session.startTransaction();
            try {
                // Fetch existing user package
                const isExist = yield package_model_1.Package.findOne({ user: userId }).session(session);
                if (isExist) {
                    // Check if the user already has the selected plan
                    const isPlanExist = (_b = isExist.packages) === null || _b === void 0 ? void 0 : _b.some((pkg) => String(pkg.plan) === String(planId));
                    if (isPlanExist) {
                        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, "You have already used this plan");
                    }
                    // Unset 'isCurrent' for other packages
                    yield package_model_1.Package.updateMany({ user: userId, "packages.isCurrent": true }, { $set: { "packages.$[].isCurrent": false } }, { session });
                    // Push the new plan
                    yield package_model_1.Package.findByIdAndUpdate(isExist === null || isExist === void 0 ? void 0 : isExist._id, {
                        $push: {
                            packages: {
                                plan: planId,
                                isCurrent: true,
                                limit: packageData,
                                paymentId: paymentId,
                            },
                        },
                    }, { session });
                }
                else {
                    // Create a new package if none exist
                    const newPackageData = {
                        user: userId,
                        packages: [
                            {
                                plan: planId,
                                isCurrent: true,
                                limit: packageData,
                                paymentId: paymentId,
                            },
                        ],
                    };
                    yield package_model_1.Package.create([newPackageData], { session });
                }
                yield session.commitTransaction();
                session.endSession();
            }
            catch (error) {
                yield session.abortTransaction();
                session.endSession();
                throw error;
            }
        });
    }
}
exports.PackageService = new Service();
