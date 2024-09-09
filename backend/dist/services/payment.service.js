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
const envConfig_1 = require("@/configurations/envConfig");
const package_service_1 = require("./package.service");
(0, dotenv_1.config)();
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
class Service {
    checkout(items) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
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
                success_url: envConfig_1.config.stripe.successUrl,
                cancel_url: envConfig_1.config.stripe.cancelUrl,
            });
            // store payment data in database
            const paymentData = items.map((item) => ({
                user: item.user,
                package: item === null || item === void 0 ? void 0 : item.package,
                sessionId: session === null || session === void 0 ? void 0 : session.id,
                sessionUrl: session === null || session === void 0 ? void 0 : session.url,
            }));
            console.log({ paymentData });
            const newPayment = yield payment_model_1.Payment.create(paymentData);
            console.log({ newPayment });
            const newPackage = yield package_service_1.PackageService.addNewPackage((_a = items[0]) === null || _a === void 0 ? void 0 : _a.user, plan === null || plan === void 0 ? void 0 : plan.id, (_b = newPayment[0]) === null || _b === void 0 ? void 0 : _b._id);
            console.log({ newPackage });
            // create a notification for new payment and new package
            return { url: session.url };
        });
    }
    webHook(event) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (event.type) {
                case "checkout.session.completed":
                    const payment = event.data.object;
                    // make the payment status as success
                    console.log("Received payment data from webhook as completed event", payment);
                    break;
                case "checkout.session.async_payment_failed":
                    const paymentFailed = event.data.object;
                    console.log("Payment failed", paymentFailed);
                    break;
                case "checkout.session.async_payment_succeeded":
                    const AsyncPaymentSucceeded = event.data.object;
                    console.log("Async payment succeed", AsyncPaymentSucceeded);
                    break;
                case "checkout.session.expired":
                    const checkoutSessionExpired = event.data.object;
                    console.log("Payment time expired", checkoutSessionExpired);
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
