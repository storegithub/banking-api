
import { IService, BaseService} from "../../generics/service/base.service";
import { Dictionary } from "src/entities/Dictionary.entity";
import { DictionaryDto } from "src/models/Dictionary.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { InjectMapper } from "nestjsx-automapper/dist/decorators";
import { AutoMapper } from "nestjsx-automapper";

export interface IDictionaryService extends IService<DictionaryDto>
{

}


export class DictionaryService extends BaseService<Dictionary, DictionaryDto> implements IDictionaryService
{
    constructor(@InjectRepository(Dictionary) repository: Repository<Dictionary>, @InjectMapper() mapper: AutoMapper)
    {
        super(repository, mapper);
    }


    
    public MapDto(entity: Dictionary): DictionaryDto
    {
        return this.mapper.map(entity, DictionaryDto, Dictionary);
    }

    public MapEntity(dto: DictionaryDto): Dictionary
    {
        return this.mapper.map(dto, Dictionary, DictionaryDto);
    }

    public MapDtos(entities: Array<Dictionary>): Array<DictionaryDto>
    {
        return this.mapper.mapArray(entities, DictionaryDto, Dictionary);
    }

    public MapEntities(dtos: Array<DictionaryDto>): Array<Dictionary>
    {
        return this.mapper.mapArray(dtos, Dictionary, DictionaryDto);
    }

    public onBeforeInsert(dto: DictionaryDto): Dictionary
    {
        const value: Dictionary = this.mapper.map(dto, Dictionary, DictionaryDto);
        value.id = 0;

        return value;
    }

    public onAfterInsert(entity: Dictionary): DictionaryDto
    {
        return this.MapDto(entity);
    }
}