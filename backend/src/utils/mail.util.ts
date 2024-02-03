import { config } from "@/configurations/envConfig";
import nodemailer from "nodemailer";

class Mail {
  sendOne(subject: string, from: string, to: string, content: string) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: config.google.appUser,
        pass: config.google.appPass,
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
      } else {
        console.log(info);
      }
    });
  }
}

export const MailUtilService = new Mail();
