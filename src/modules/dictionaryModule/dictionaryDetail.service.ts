
import { IService, BaseService} from "../../generics/service/base.service";
import { DictionaryDetail } from "src/entities/dictionaryDetail.entity";
import { DictionaryDetailDto } from "src/models/dictionaryDetail.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { InjectMapper } from "nestjsx-automapper/dist/decorators";
import { AutoMapper } from "nestjsx-automapper";

export interface IDictionaryDetailService extends IService<DictionaryDetailDto>
{

}


export class DictionaryDetailService extends BaseService<DictionaryDetail, DictionaryDetailDto> implements IDictionaryDetailService
{
    constructor(@InjectRepository(DictionaryDetail) repository: Repository<DictionaryDetail>, @InjectMapper() mapper: AutoMapper)
    {
        super(repository, mapper);
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