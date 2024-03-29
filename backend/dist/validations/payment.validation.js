"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentValidationSchema = void 0;
const zod_1 = require("zod");
const paymentPostSchema = zod_1.z.object({
    body: zod_1.z.array(zod_1.z
        .object({
        user: zod_1.z.string({
            required_error: "User id is required",
            invalid_type_error: "User id must be string",
        }),
        package: zod_1.z.string({
            required_error: "package_id is required",
            invalid_type_error: "package_id be string",
        }),
        sessionId: zod_1.z
            .string({
            invalid_type_error: "session_id be string",
        })
            .optional(),
        status: zod_1.z
            .string({
            invalid_type_error: "session_id be string",
        })
            .optional(),
    })
        .strict()),
});
exports.PaymentValidationSchema = {
    paymentPostSchema,
};
