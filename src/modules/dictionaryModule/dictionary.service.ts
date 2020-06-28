
import { IService, BaseService} from "../../generics/service/base.service";
import { Dictionary } from "src/entities/Dictionary.entity";
import { DictionaryDto } from "src/models/Dictionary.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AutoMapper, InjectMapper } from "nestjsx-automapper"; 
import { Injectable } from "@nestjs/common";

export interface IDictionaryService extends IService<DictionaryDto>
{
    getByName(name: string): Promise<DictionaryDto>;
}

@Injectable()
export class DictionaryService extends BaseService<Dictionary, DictionaryDto> implements IDictionaryService
{
    constructor(@InjectRepository(Dictionary) repository: Repository<Dictionary>, @InjectMapper() mapper: AutoMapper)
    {
        super(repository, mapper);
    }

    public async getByName(name: string): Promise<DictionaryDto> {
        let dictionary: Dictionary = await this.repository.findOne({ name: name });
        if(dictionary == null)
            return null;
        
            let a = this.MapEntity(new DictionaryDto());
        return this.MapDto(dictionary);
    }


    
    public MapDto(entity: Dictionary): DictionaryDto
    {
        const dto: DictionaryDto = new DictionaryDto();
        dto.name = entity.name;
        dto.id = entity.id;

        return dto;
    }

    public MapEntity(dto: DictionaryDto): Dictionary
    {
        const item: Dictionary = new Dictionary();
        item.name = dto.name;
        item.id = dto.id;

        return item;
    }

    public MapDtos(entities: Array<Dictionary>): Array<DictionaryDto>
    {
        return entities.map(item => this.MapDto(item));
    }

    public MapEntities(dtos: Array<DictionaryDto>): Array<Dictionary>
    {
        return dtos.map(item => this.MapEntity(item));
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