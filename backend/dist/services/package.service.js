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
    planSanitizer(plan) {
        return {
            id: String((plan === null || plan === void 0 ? void 0 : plan.id) || (plan === null || plan === void 0 ? void 0 : plan._id)),
            name: plan === null || plan === void 0 ? void 0 : plan.plan,
            price: plan === null || plan === void 0 ? void 0 : plan.price,
            features: plan === null || plan === void 0 ? void 0 : plan.features,
        };
    }
    paymentSanitizer(payment) {
        return {
            id: String((payment === null || payment === void 0 ? void 0 : payment.id) || (payment === null || payment === void 0 ? void 0 : payment._id)),
            user: payment === null || payment === void 0 ? void 0 : payment.user,
            plan: payment === null || payment === void 0 ? void 0 : payment.plan,
            paymentAmount: payment === null || payment === void 0 ? void 0 : payment.paymentAmount,
            sessionId: payment === null || payment === void 0 ? void 0 : payment.sessionId,
            sessionUrl: payment === null || payment === void 0 ? void 0 : payment.sessionUrl,
            status: payment === null || payment === void 0 ? void 0 : payment.status,
            createdAt: payment === null || payment === void 0 ? void 0 : payment.createdAt,
            updatedAt: payment === null || payment === void 0 ? void 0 : payment.updatedAt,
        };
    }
    packageDetailSanitizer(pkgs) {
        return pkgs === null || pkgs === void 0 ? void 0 : pkgs.map((pkg) => ({
            id: String((pkg === null || pkg === void 0 ? void 0 : pkg.id) || (pkg === null || pkg === void 0 ? void 0 : pkg._id)),
            plan: this.planSanitizer(pkg === null || pkg === void 0 ? void 0 : pkg.plan),
            limit: pkg === null || pkg === void 0 ? void 0 : pkg.limit,
            payment: this.paymentSanitizer(pkg === null || pkg === void 0 ? void 0 : pkg.payment),
            isCurrent: pkg === null || pkg === void 0 ? void 0 : pkg.isCurrent,
            start: pkg === null || pkg === void 0 ? void 0 : pkg.start,
            end: pkg === null || pkg === void 0 ? void 0 : pkg.end,
        }));
    }
    packageSanitizer(pkg) {
        return {
            id: String((pkg === null || pkg === void 0 ? void 0 : pkg.id) || (pkg === null || pkg === void 0 ? void 0 : pkg._id)),
            user: pkg === null || pkg === void 0 ? void 0 : pkg.user,
            packages: this.packageDetailSanitizer(pkg === null || pkg === void 0 ? void 0 : pkg.packages),
            createdAt: pkg === null || pkg === void 0 ? void 0 : pkg.createdAt,
            updatedAt: pkg === null || pkg === void 0 ? void 0 : pkg.updatedAt,
        };
    }
    addNewPackage(userId, planId, paymentId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
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
                                payment: paymentId,
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
                                payment: paymentId,
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
    isPackageExist(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield package_model_1.Package.findOne({ user: userId });
        });
    }
    getMyPackage(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const myPackage = yield package_model_1.Package.findOne({ user: userId })
                .populate("packages.plan")
                .populate("packages.payment");
            return this.packageSanitizer(myPackage);
        });
    }
}
exports.PackageService = new Service();
