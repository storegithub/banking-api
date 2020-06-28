import { BaseController } from "src/generics/controller/base.controller";
import { DictionaryDto } from "src/models/Dictionary.dto";
import { Inject, Controller } from "@nestjs/common";
import { IDictionaryService } from "./dictionary.service";
import { IDictionaryDetailService } from "./dictionaryDetail.service";

@Controller('dictionary')
export class DictionaryController extends BaseController<DictionaryDto>
{

    private readonly dictionaryDetailService: IDictionaryDetailService;

    constructor(@Inject('IDictionaryService') dictionaryService: IDictionaryService, 
                @Inject('IDictionaryDetailService') dictionaryDetailService: IDictionaryDetailService)
    {
        super(dictionaryService);
        this.dictionaryDetailService = dictionaryDetailService;
    }

    
}