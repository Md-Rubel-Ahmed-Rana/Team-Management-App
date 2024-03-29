"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailRoutes = void 0;
const mail_controller_1 = require("@/controllers/mail.controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/contact", mail_controller_1.MailController.contactMail);
exports.MailRoutes = router;
