
import { IService, BaseService} from "../../generics/service/base.service";
import { Bank } from "src/entities/bank.entity";
import { BankDto } from "src/models/bank.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { InjectMapper } from "nestjsx-automapper/dist/decorators";
import { AutoMapper } from "nestjsx-automapper";

export interface IBankService extends IService<BankDto>
{

}


export class BankService extends BaseService<Bank, BankDto> implements IBankService
{
    constructor(@InjectRepository(Bank) repository: Repository<Bank>, @InjectMapper() mapper: AutoMapper)
    {
        super(repository, mapper);
    }


    
    public MapDto(entity: Bank): BankDto
    {
        return this.mapper.map(entity, BankDto, Bank);
    }

    public MapEntity(dto: BankDto): Bank
    {
        return this.mapper.map(dto, Bank, BankDto);
    }

    public MapDtos(entities: Array<Bank>): Array<BankDto>
    {
        return this.mapper.mapArray(entities, BankDto, Bank);
    }

    public MapEntities(dtos: Array<BankDto>): Array<Bank>
    {
        return this.mapper.mapArray(dtos, Bank, BankDto);
    }

    public onBeforeInsert(dto: BankDto): Bank
    {
        const value: Bank = this.mapper.map(dto, Bank, BankDto);
        value.id = 0;

        return value;
    }

    public onAfterInsert(entity: Bank): BankDto
    {
        return this.MapDto(entity);
    }
}