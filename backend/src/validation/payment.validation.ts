import { z as zod } from "zod";

const paymentPostSchema = zod.object({
  body: zod.array(
    zod
      .object({
        user_id: zod.string({
          required_error: "User id is required",
          invalid_type_error: "User id must be string",
        }),
        payment_amount: zod.number({
          required_error: "payment_amount is required",
          invalid_type_error: "payment_amount be number",
        }),
        package_name: zod.string({
          required_error: "package_name is required",
          invalid_type_error: "package_name be string",
        }),
        package_type: zod
          .string({
            invalid_type_error: "package_type be string",
          })
          .optional(),
        package_date: zod
          .string({
            invalid_type_error: "package_date be string",
          })
          .optional(),
        package_method: zod.string({
          required_error: "package_method is required",
          invalid_type_error: "package_method be string",
        }),
        session_id: zod
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
