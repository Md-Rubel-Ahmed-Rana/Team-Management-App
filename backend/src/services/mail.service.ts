import { IContactMail } from "@/interfaces/mail.interfaces";
import { MailUtilService } from "@/utils/mail.util";
import { MailModels } from "@/models/mail.model";
import { config } from "@/configurations/envConfig";

class Service {
  async contactMail(data: IContactMail) {
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
