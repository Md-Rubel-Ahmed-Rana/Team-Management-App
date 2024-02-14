import { PaymentController } from "@/controllers/payment.controller";
import verifyJwt from "@/middlewares/auth";
import express, { Router } from "express";

const router = Router();

router.post("/checkout", verifyJwt, PaymentController.checkout);

router.post(
  "/webhook",
  express.json({ type: "application/json" }),
  PaymentController.webhook
);

router.get("/:userId", PaymentController.myPayments);

export const PaymentRoutes = router;
