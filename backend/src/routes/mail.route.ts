import { Router } from "express";
import { MailController } from "../controllers/mail.controller";

const router = Router();

router.post("/contact", MailController.contactMail);

export const MailRoutes = router;
