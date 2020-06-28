
import { IService, BaseService} from "../../generics/service/base.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";
import { AboutDto } from "../../models/about.dto";
import { IDictionaryDetailService } from "../dictionaryModule/dictionaryDetail.service";
import { DictionaryDetailDto } from "src/models/dictionarydetail.dto";
import { Inject, Injectable } from "@nestjs/common";

export interface IAboutService
{
    get(): Promise<AboutDto>;
}

@Injectable()
export class AboutService implements IAboutService
{
    private aboutKey : string = "about.us.default";
    private aboutPhone : string = "about.us.phone";
    private aboutEmail : string = "about.us.email";
    private aboutDetails : string = "about.us.details";

    private readonly dictionaryDetailService: IDictionaryDetailService;
    private readonly mapper: AutoMapper;

    constructor(@InjectMapper() mapper: AutoMapper, 
        @Inject('IDictionaryDetailService') dictionaryDetailService: IDictionaryDetailService)
    {
        this.dictionaryDetailService = dictionaryDetailService;
        this.mapper = mapper;
    }

   public async get(): Promise<AboutDto>{
        let infos: DictionaryDetailDto[] = await this.dictionaryDetailService.getByDictionary(this.aboutKey);

        const about: AboutDto = {
            email: infos.find(item => item.name == this.aboutEmail).value,
            phone: infos.find(item => item.name == this.aboutPhone).value,
            details: infos.find(item => item.name == this.aboutDetails).value
        };

        return about;
   } 
}