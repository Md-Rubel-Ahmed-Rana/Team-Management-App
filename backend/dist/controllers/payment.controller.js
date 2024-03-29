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
exports.PaymentController = void 0;
const payment_service_1 = require("@/services/payment.service");
const rootController_1 = __importDefault(require("@/shared/rootController"));
const http_status_1 = __importDefault(require("http-status"));
class Controller extends rootController_1.default {
    constructor() {
        super(...arguments);
        this.checkout = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield payment_service_1.PaymentService.checkout(req.body);
            this.apiResponse(res, {
                statusCode: http_status_1.default.OK,
                success: true,
                message: "Payment proceed",
                data: result,
            });
        }));
        this.myPayments = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            const result = yield payment_service_1.PaymentService.myPayments(userId);
            this.apiResponse(res, {
                statusCode: http_status_1.default.OK,
                success: true,
                message: "Payments found",
                data: result,
            });
        }));
        this.webhook = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            yield payment_service_1.PaymentService.webHook(req.body);
            this.apiResponse(res, {
                statusCode: http_status_1.default.OK,
                success: true,
                message: "Webhook received successfully",
                data: { received: true },
            });
        }));
    }
}
exports.PaymentController = new Controller();
