"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    sendResetPasswordLink(to, link) {
        return __awaiter(this, void 0, void 0, function* () {
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
                from: `Team Manager <${envConfig_1.config.google.appUser}>`,
                to: to,
                subject: "Reset Password",
                html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f7f7f7;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
          .container {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 600px;
          }
          h1 {
            color: #333333;
          }
          p {
            color: #555555;
          }
          a {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            color: white;
            background-color: #007BFF;
            border-radius: 5px;
            text-decoration: none;
          }
          a:hover {
            background-color: #0056b3;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Password Reset Request</h1>
          <p>This link will be expired in 10 minutes</p>
          <p>We received a request to reset your password. Click the link below to reset it:</p>
          <a style="color: white" href="${link}">Reset Password</a>
          <p>If you did not request a password reset, please ignore this email or contact support if you have questions.</p>
        </div>
      </body>
      </html>
    `,
            };
            const info = yield transporter.sendMail(mailOptions);
            return info;
        });
    }
}
exports.MailUtilService = new Mail();
