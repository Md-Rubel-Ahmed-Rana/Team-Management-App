import { MailController } from "@/controllers/mail.controller";
import { Router } from "express";

const router = Router();

router.post("/contact", MailController.contactMail);

export const MailRoutes = router;
