import { BaseService, IService } from "src/generics/service/base.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { InjectMapper, AutoMapper } from "nestjsx-automapper";
import { TransactionTypeDto } from "src/models/transactiontype.dto";
import { TransactionType } from "src/entities/transactionType.entity";
import { Injectable } from "@nestjs/common";


export interface ITransactionTypeService extends IService<TransactionTypeDto>
{
    getEntityById(id: number);
    getEntityByName(name: string): Promise<TransactionType> ;
}

@Injectable()
export class TransactionTypeService extends BaseService<TransactionType, TransactionTypeDto> implements ITransactionTypeService
{
    constructor(@InjectRepository(TransactionType) repository: Repository<TransactionType>, @InjectMapper() mapper: AutoMapper)
    {
        super(repository, mapper);
    }
    async getEntityById(id: number): Promise<TransactionType> 
    {
        return await this.repository.findOne({ where: { id: id } });
    }
    async getEntityByName(name: string): Promise<TransactionType> 
    {
        return await this.repository.findOne({ where: { details: name } });
    }



    
    public MapDto(entity: TransactionType): TransactionTypeDto
    {
        return this.mapper.map(entity, TransactionTypeDto, TransactionType);
    }

    public MapEntity(dto: TransactionTypeDto): TransactionType
    {
        return this.mapper.map(dto, TransactionType, TransactionTypeDto);
    }

    public MapDtos(entities: Array<TransactionType>): Array<TransactionTypeDto>
    {
        return this.mapper.mapArray(entities, TransactionTypeDto, TransactionType);
    }

    public MapEntities(dtos: Array<TransactionTypeDto>): Array<TransactionType>
    {
        return this.mapper.mapArray(dtos, TransactionType, TransactionTypeDto);
    }

    public onBeforeInsert(dto: TransactionTypeDto): TransactionType
    {
        const value: TransactionType = this.mapper.map(dto, TransactionType, TransactionTypeDto);
        value.id = 0;

        return value;
    }

    public onAfterInsert(entity: TransactionType): TransactionTypeDto
    {
        return this.MapDto(entity);
    }
}