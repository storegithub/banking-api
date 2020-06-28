import { BaseService, IService } from "src/generics/service/base.service";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectMapper, AutoMapper } from "nestjsx-automapper";
import { BranchTypeDto } from "src/models/branchtype.dto";
import { BranchType } from "src/entities/branchtype.entity";
import { Injectable } from "@nestjs/common";


export interface IBranchTypeService extends IService<BranchTypeDto>
{

}

@Injectable()
export class BranchTypeService extends BaseService<BranchType, BranchTypeDto> implements IBranchTypeService
{
    constructor(@InjectRepository(BranchType) repository: Repository<BranchType>, @InjectMapper() mapper: AutoMapper)
    {
        super(repository, mapper);
    }


    
    public MapDto(entity: BranchType): BranchTypeDto
    {
        return this.mapper.map(entity, BranchTypeDto, BranchType);
    }

    public MapEntity(dto: BranchTypeDto): BranchType
    {
        return this.mapper.map(dto, BranchType, BranchTypeDto);
    }

    public MapDtos(entities: Array<BranchType>): Array<BranchTypeDto>
    {
        return this.mapper.mapArray(entities, BranchTypeDto, BranchType);
    }

    public MapEntities(dtos: Array<BranchTypeDto>): Array<BranchType>
    {
        return this.mapper.mapArray(dtos, BranchType, BranchTypeDto);
    }

    public onBeforeInsert(dto: BranchTypeDto): BranchType
    {
        const value: BranchType = this.mapper.map(dto, BranchType, BranchTypeDto);
        value.id = 0;

        return value;
    }

    public onAfterInsert(entity: BranchType): BranchTypeDto
    {
        return this.MapDto(entity);
    }
}