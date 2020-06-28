
import { IService, BaseService} from "../../generics/service/base.service";
import { DictionaryDetail } from "src/entities/dictionaryDetail.entity";
import { DictionaryDetailDto } from "src/models/dictionaryDetail.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AutoMapper, InjectMapper } from "nestjsx-automapper"; 
import { IDictionaryService } from "./dictionary.service";
import { DictionaryDto } from "src/models/dictionary.dto";
import { Inject, Injectable } from "@nestjs/common";
import { SelectItem } from "src/models/selectitem";

export interface IDictionaryDetailService extends IService<DictionaryDetailDto>
{
    getByDictionary(dictionaryName: string) : Promise<DictionaryDetailDto[]>;
    getAsDropDown(dictionaryName: string): Promise<SelectItem<string, string>[]>;
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
    public async getAsDropDown(dictionaryName: string): Promise<SelectItem<string, string>[]> {
        const currencies: DictionaryDetailDto[] = await this.getByDictionary(dictionaryName);
        return currencies.map(item => {
            let data: SelectItem<string, string> = new SelectItem<string, string>();
            data.value = item.name;
            data.text = item.value;
            return data;
        }); 
    }

    public async getByDictionary(dictionaryName: string) : Promise<DictionaryDetailDto[]>
    {
        let dictionary: DictionaryDto = await this.dictionaryService.getByName(dictionaryName);

        let details: DictionaryDetail[] = await this.repository.find({ dictionaryId: dictionary.id, active: true });

        return this.MapDtos(details);
    }


    public MapDto(entity: DictionaryDetail): DictionaryDetailDto
    {
        const item: DictionaryDetailDto = new DictionaryDetailDto();
        item.id = entity.id;
        item.dictionaryId = entity.id;
        item.active = entity.active;
        item.name = entity.name;
        item.value = entity.value;
        return item;
    }

    public MapEntity(dto: DictionaryDetailDto): DictionaryDetail
    {
        const item: DictionaryDetail = new DictionaryDetail();
        item.id = dto.id;
        item.dictionaryId = dto.id;
        item.active = dto.active;
        item.name = dto.name;
        item.value = dto.value;

        return item;
    }

    public MapDtos(entities: Array<DictionaryDetail>): Array<DictionaryDetailDto>
    {
        return entities.map(item => this.MapDto(item));
    }

    public MapEntities(dtos: Array<DictionaryDetailDto>): Array<DictionaryDetail>
    {
        return dtos.map(item => this.MapEntity(item));
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