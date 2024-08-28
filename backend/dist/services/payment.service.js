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
const plan_model_1 = require("@/models/plan.model");
const payment_model_1 = require("@/models/payment.model");
(0, dotenv_1.config)();
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
class Service {
    checkout(items) {
        return __awaiter(this, void 0, void 0, function* () {
            const plan = yield plan_model_1.Plan.findById(items[0].package);
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
                            name: plan === null || plan === void 0 ? void 0 : plan.plan,
                        },
                        unit_amount: plan && (plan === null || plan === void 0 ? void 0 : plan.price) * 100,
                    },
                    quantity: item.quantity,
                };
            });
            const session = yield stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                mode: "payment",
                line_items: storedData,
                success_url: process.env.SUCCESS_URL,
                cancel_url: process.env.CANCEL_URL,
            });
            // store payment data in database
            const paymentData = items.map((item) => ({
                user: item.user,
                package: item.package,
                sessionId: session === null || session === void 0 ? void 0 : session.id,
            }));
            yield payment_model_1.Payment.create(paymentData);
            return { url: session.url };
        });
    }
    webHook(event) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (event.type) {
                case "checkout.session.completed":
                    const payment = event.data.object;
                    break;
                default:
                    console.log(`Unhandled event type ${event.type}`);
            }
        });
    }
    myPayments(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const payments = yield payment_model_1.Payment.find({ user: userId }).populate({
                path: "package",
                model: "Plan",
            });
            return payments;
        });
    }
}
exports.PaymentService = new Service();
