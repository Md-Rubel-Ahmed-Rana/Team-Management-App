import { PaymentController } from "@/controllers/payment.controller";
import express, { Router } from "express";
import { JwtInstance } from "lib/jwt";

const router = Router();

router.post("/checkout", JwtInstance.verifyToken, PaymentController.checkout);

router.post(
  "/webhook",
  express.json({ type: "application/json" }),
  PaymentController.webhook
);

router.get("/:userId", PaymentController.myPayments);

export const PaymentRoutes = router;
