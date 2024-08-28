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
exports.PlanService = void 0;
const plan_model_1 = require("@/models/plan.model");
class Service {
    getPlans() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield plan_model_1.Plan.find({});
            return result;
        });
    }
    createPlan(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield plan_model_1.Plan.create(data);
            return result;
        });
    }
    getSinglePlan(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield plan_model_1.Plan.findById(id);
            return result;
        });
    }
}
exports.PlanService = new Service();
