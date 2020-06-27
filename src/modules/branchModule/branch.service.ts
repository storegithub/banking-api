
import { IService, BaseService} from "../../generics/service/base.service";
import { Branch } from "src/entities/branch.entity";
import { BranchDto } from "src/models/branch.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { InjectMapper } from "nestjsx-automapper/dist/decorators";
import { AutoMapper } from "nestjsx-automapper";

export interface IBranchService extends IService<BranchDto>
{

}


export class BranchService extends BaseService<Branch, BranchDto> implements IBranchService
{
    constructor(@InjectRepository(Branch) repository: Repository<Branch>, @InjectMapper() mapper: AutoMapper)
    {
        super(repository, mapper);
    }


    
    public MapDto(entity: Branch): BranchDto
    {
        return this.mapper.map(entity, BranchDto, Branch);
    }

    public MapEntity(dto: BranchDto): Branch
    {
        return this.mapper.map(dto, Branch, BranchDto);
    }

    public MapDtos(entities: Array<Branch>): Array<BranchDto>
    {
        return this.mapper.mapArray(entities, BranchDto, Branch);
    }

    public MapEntities(dtos: Array<BranchDto>): Array<Branch>
    {
        return this.mapper.mapArray(dtos, Branch, BranchDto);
    }

    public onBeforeInsert(dto: BranchDto): Branch
    {
        const value: Branch = this.mapper.map(dto, Branch, BranchDto);
        value.id = 0;

        return value;
    }

    public onAfterInsert(entity: Branch): BranchDto
    {
        return this.MapDto(entity);
    }
}