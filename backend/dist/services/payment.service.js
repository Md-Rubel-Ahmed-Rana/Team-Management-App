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
exports.PaymentService = void 0;
const stripe_1 = __importDefault(require("stripe"));
const dotenv_1 = require("dotenv");
const payment_model_1 = require("@/models/payment.model");
const envConfig_1 = require("@/configurations/envConfig");
const package_service_1 = require("./package.service");
(0, dotenv_1.config)();
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
class Service {
    checkout(items) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const storedData = items.map((item) => {
                if (item === null || item === void 0 ? void 0 : item.quantity) {
                    item.quantity = item.quantity >= 1 ? item.quantity : 1;
                }
                else {
                    item.quantity = 1;
                }
                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: item.name,
                        },
                        unit_amount: (item === null || item === void 0 ? void 0 : item.price) * 100,
                    },
                    quantity: item.quantity,
                };
            });
            const session = yield stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                mode: "payment",
                line_items: storedData,
                success_url: envConfig_1.config.stripe.successUrl,
                cancel_url: envConfig_1.config.stripe.cancelUrl,
            });
            // store payment data in database
            const paymentData = items.map((item) => ({
                user: item === null || item === void 0 ? void 0 : item.user,
                plan: item === null || item === void 0 ? void 0 : item.id,
                paymentAmount: item === null || item === void 0 ? void 0 : item.price,
                sessionId: session === null || session === void 0 ? void 0 : session.id,
                sessionUrl: session === null || session === void 0 ? void 0 : session.url,
            }));
            const newPayment = yield payment_model_1.Payment.create(paymentData[0]);
            yield package_service_1.PackageService.addNewPackage((_a = items[0]) === null || _a === void 0 ? void 0 : _a.user, (_b = items[0]) === null || _b === void 0 ? void 0 : _b.id, newPayment === null || newPayment === void 0 ? void 0 : newPayment._id);
            // create a notification for new payment and new package
            return { url: session.url };
        });
    }
    makePaymentStatusSuccess(sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield payment_model_1.Payment.updateOne({ sessionId: sessionId }, { $set: { status: "success" } });
        });
    }
    webHook(event) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (event.type) {
                case "checkout.session.completed":
                    const payment = event.data.object;
                    const sessionId = payment === null || payment === void 0 ? void 0 : payment.id;
                    yield this.makePaymentStatusSuccess(sessionId);
                    break;
                default:
                    console.log(`Unhandled event type ${event.type}`);
            }
        });
    }
    myPayments(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const payments = yield payment_model_1.Payment.find({ user: userId }).populate({
                path: "plan",
                model: "Plan",
            });
            return payments;
        });
    }
}
exports.PaymentService = new Service();
