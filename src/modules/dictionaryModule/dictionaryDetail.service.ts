
import { IService, BaseService} from "../../generics/service/base.service";
import { DictionaryDetail } from "src/entities/dictionaryDetail.entity";
import { DictionaryDetailDto } from "src/models/dictionaryDetail.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AutoMapper, InjectMapper } from "nestjsx-automapper"; 
import { IDictionaryService } from "./dictionary.service";
import { DictionaryDto } from "src/models/dictionary.dto";
import { Inject, Injectable } from "@nestjs/common";

export interface IDictionaryDetailService extends IService<DictionaryDetailDto>
{
    getByDictionary(dictionaryName: string) : Promise<DictionaryDetailDto[]>;
}

@Injectable()
export class DictionaryDetailService extends BaseService<DictionaryDetail, DictionaryDetailDto> implements IDictionaryDetailService
{
    private readonly dictionaryService: IDictionaryService;

    constructor(@InjectRepository(DictionaryDetail) repository: Repository<DictionaryDetail>, 
        @InjectMapper() mapper: AutoMapper,
        @Inject('IDictionaryService') dictionaryService: IDictionaryService)
    {
        super(repository, mapper);
        this.dictionaryService = dictionaryService;
    }

    public async getByDictionary(dictionaryName: string) : Promise<DictionaryDetailDto[]>
    {
        let dictionary: DictionaryDto = await this.dictionaryService.getByName(dictionaryName);

        let details: DictionaryDetail[] = await this.repository.find({ dictionaryId: dictionary.id, active: true });

        return this.MapDtos(details);
    }


    public MapDto(entity: DictionaryDetail): DictionaryDetailDto
    {
        return this.mapper.map(entity, DictionaryDetailDto, DictionaryDetail);
    }

    public MapEntity(dto: DictionaryDetailDto): DictionaryDetail
    {
        return this.mapper.map(dto, DictionaryDetail, DictionaryDetailDto);
    }

    public MapDtos(entities: Array<DictionaryDetail>): Array<DictionaryDetailDto>
    {
        return this.mapper.mapArray(entities, DictionaryDetailDto, DictionaryDetail);
    }

    public MapEntities(dtos: Array<DictionaryDetailDto>): Array<DictionaryDetail>
    {
        return this.mapper.mapArray(dtos, DictionaryDetail, DictionaryDetailDto);
    }

    public onBeforeInsert(dto: DictionaryDetailDto): DictionaryDetail
    {
        const value: DictionaryDetail = this.mapper.map(dto, DictionaryDetail, DictionaryDetailDto);
        value.id = 0;

        return value;
    }

    public onAfterInsert(entity: DictionaryDetail): DictionaryDetailDto
    {
        return this.MapDto(entity);
    }
}