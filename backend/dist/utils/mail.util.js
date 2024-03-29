"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailUtilService = void 0;
const envConfig_1 = require("@/configurations/envConfig");
const nodemailer_1 = __importDefault(require("nodemailer"));
class Mail {
    sendOne(subject, from, to, content) {
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            secure: true,
            host: "smtp.gmail.com",
            port: 465,
            auth: {
                user: envConfig_1.config.google.appUser,
                pass: envConfig_1.config.google.appPass,
            },
        });
        const mailOptions = {
            from: from,
            to: to,
            subject: subject,
            html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body>
          <p>${content}</p>
        </body>
        </html>
      `,
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log(info);
            }
        });
    }
}
exports.MailUtilService = new Mail();
