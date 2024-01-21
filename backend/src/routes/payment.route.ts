import express, { Router } from "express";
import { PaymentController } from "../controllers/payment.controller";

const router = Router();

router.post("/checkout", PaymentController.checkout);

router.post(
  "/webhook",
  express.json({ type: "application/json" }),
  PaymentController.webhook
);

router.get("/:userId", PaymentController.myPayments);

export const PaymentRoutes = router;
