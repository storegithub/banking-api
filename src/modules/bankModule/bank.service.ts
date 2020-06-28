import { IService, BaseService } from "src/generics/service/base.service";
import { Repository } from "typeorm";
import { InjectMapper, AutoMapper } from "nestjsx-automapper";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { BankDto } from "src/models/bank.dto";
import { Bank } from "src/entities/bank.entity";

export interface IBankService extends IService<BankDto>
{

}

@Injectable()
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