import { config } from "../config";
import { contactMail } from "../interfaces/mail.interfaces";
import { MailModels } from "../models/mail.model";
import { MailUtilService } from "../utils/mail.util";

class Service {
  async contactMail(data: contactMail) {
    await MailUtilService.sendOne(
      "Team Manager Contact",
      `${data.name} ${data.email}`,
      config.google.appUser,
      data.message
    );
    const result = await MailModels.ContactMail.create(data);
    return result;
  }
}

export const MailService = new Service();
