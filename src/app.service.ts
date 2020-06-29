import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AppService {

  constructor(private readonly mailerService: MailerService) {}
  public async getHello(): Promise<string> {

    try
    {
      let response: any = await this.mailerService.sendMail({
        to: 'brulea.andrei@yahoo.ro',
        from: 'replayn.homebank@gmail.com',
        subject: "test",
        // text: 'welcome',
        html: '<b>welcome</b>'
      })
    }
    catch(err)
    {
      console.log(err);
    }

    return 'Hello World!';
  }
}
