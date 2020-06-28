import { BaseController } from "src/generics/controller/base.controller";
import { Inject, Get, Controller } from "@nestjs/common";
import { AboutDto } from "src/models/about.dto";
import { isAbsolute } from "path";
import { IAboutService } from "./about.service";
import { AutoMapper } from "@nartc/automapper";

@Controller("about")
export class AboutController 
{
    private readonly aboutService: IAboutService;

    constructor(@Inject('IAboutService') aboutService: IAboutService)
    {
      this.aboutService = aboutService;
    }

    @Get()
    public async Get(): Promise<AboutDto>
    {
        return await this.aboutService.get();
    }
}