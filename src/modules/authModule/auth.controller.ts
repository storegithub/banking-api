import { Controller, Post, Body, Get, ValidationPipe, Request, UseGuards, Inject } from '@nestjs/common';
import { IAuthService } from './auth.service';
import { Credentials } from '../../models/credentials.dto';
import { UserDto } from 'src/models/user.dto';
import { JwtAuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {

    private readonly authService: IAuthService;

    constructor(@Inject("IAuthService") authService: IAuthService)
    {
        this.authService = authService;
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    public index(): string
    {
        return "ok";
    }

    @Post("/register")
    public async register(@Body(ValidationPipe) user: UserDto)
    {
        return await this.authService.register(user);
    }

    @Post('/login')
    public async login(@Body(ValidationPipe) credentials: Credentials)
    {
        return await this.authService.login(credentials);
    }
}
