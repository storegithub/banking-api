import { BaseController } from "src/generics/controller/base.controller";
import { IUserService } from "./user.service";
import { UserDto } from "src/models/user.dto";
import { Controller, Inject, Get } from "@nestjs/common";

@Controller('users')
export class UserController extends BaseController<UserDto>
{
    constructor(@Inject('IUserService') userService: IUserService)
    {
        super(userService);
    }

}