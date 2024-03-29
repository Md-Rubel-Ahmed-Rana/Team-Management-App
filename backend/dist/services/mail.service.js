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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const mail_util_1 = require("@/utils/mail.util");
const mail_model_1 = require("@/models/mail.model");
const envConfig_1 = require("@/configurations/envConfig");
class Service {
    contactMail(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield mail_util_1.MailUtilService.sendOne("Team Manager Contact", `${data.name} ${data.email}`, envConfig_1.config.google.appUser, data.message);
            const result = yield mail_model_1.MailModels.ContactMail.create(data);
            return result;
        });
    }
}
exports.MailService = new Service();
