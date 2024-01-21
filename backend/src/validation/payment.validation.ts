import { z as zod } from "zod";

const paymentPostSchema = zod.object({
  body: zod.array(
    zod
      .object({
        userId: zod.string({
          required_error: "User id is required",
          invalid_type_error: "User id must be string",
        }),
        paymentAmount: zod.number({
          required_error: "payment_amount is required",
          invalid_type_error: "payment_amount be number",
        }),
        packageName: zod.string({
          required_error: "package_name is required",
          invalid_type_error: "package_name be string",
        }),
        sessionId: zod
          .string({
            invalid_type_error: "session_id be string",
          })
          .optional(),
        status: zod
          .string({
            invalid_type_error: "session_id be string",
          })
          .optional(),
      })
      .strict()
  ),
});

export const PaymentValidationSchema = {
  paymentPostSchema,
};
