import { z as zod } from "zod";

const paymentPostSchema = zod.object({
  body: zod.array(
    zod
      .object({
        user: zod.string({
          required_error: "User id is required",
          invalid_type_error: "User id must be string",
        }),
        package: zod.string({
          required_error: "package_id is required",
          invalid_type_error: "package_id be string",
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
