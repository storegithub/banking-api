import { MailerService } from "@nestjs-modules/mailer";
import { UserDto } from "src/models/user.dto";
import { TemplateHelper } from "src/helper/templatehelper";
import { SelectItem } from "src/models/selectitem";

export class NotificationService
{
    constructor(private readonly mailerService: MailerService)
    {

    }

    public async sendCode(user: UserDto, data: SelectItem<string, string>[])
    {
        try
        {
            let response: any = await this.mailerService.sendMail({
                to: user.email,
                from: 'replyn.homebank@gmail.com',
                subject: "Cod autorizare", 
                html: TemplateHelper.parseTemplate("AuthorizationTemplate", data)
              }) 
        }
        catch(err)
        {
            throw err;
        }
    }

    public async sendPaymentCode(user: UserDto, data: SelectItem<string, string>[])
    {
        try
        {
            let response: any = await this.mailerService.sendMail({
                to: user.email,
                from: 'replyn.homebank@gmail.com',
                subject: "Cod autorizare plata", 
                html: TemplateHelper.parseTemplate("AuthorizationTemplate", data)
              }) 
        }
        catch(err)
        {
            throw err;
        }
    }

    public async sendRegistration(user: UserDto, data: SelectItem<string, string>[])
    {
        try
        {
            let response: any = await this.mailerService.sendMail({
                to: user.email,
                from: 'replyn.homebank@gmail.com',
                subject: "Confirmare cont", 
                html: TemplateHelper.parseTemplate("RegistrationTemplate", data)
              }) 
        }
        catch(err)
        {
            throw err;
        }
    }

    public async sendChangePassword(user: UserDto, data: SelectItem<string, string>[])
    {
        try
        {
            let response: any = await this.mailerService.sendMail({
                to: user.email,
                from: 'replyn.homebank@gmail.com',
                subject: "Change password", 
                html: TemplateHelper.parseTemplate("ChangePasswordTemplate", data)
              }) 
        }
        catch(err)
        {
            throw err;
        }
    }
}