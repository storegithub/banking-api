import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './modules/authModule/auth.guard';
import { SessionService } from './modules/shared/session.service';
import { UserDto } from './models/user.dto';

@Controller("values")
export class AppController {
  constructor(private readonly appService: AppService, private readonly session: SessionService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getHello(): Promise<string> {

    let user: UserDto = this.session.getUser();


    return await this.appService.getHello();
  }
}
