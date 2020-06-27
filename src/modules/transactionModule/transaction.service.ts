import { IService, BaseService } from "src/generics/service/base.service";
import { Repository } from "typeorm";
import { InjectMapper, AutoMapper } from "nestjsx-automapper";
import { InjectRepository } from "@nestjs/typeorm";
import { TransactionDto } from "src/models/transaction.dto";
import { Transaction } from "src/entities/transaction.entity";

export interface ITransactionService extends IService<TransactionDto>
{

}

export class TransactionService extends BaseService<Transaction, TransactionDto> implements ITransactionService
{
    constructor(@InjectRepository(Transaction) repository: Repository<Transaction>, @InjectMapper() mapper: AutoMapper)
    {
        super(repository, mapper);
    }


    
    public MapDto(entity: Transaction): TransactionDto
    {
        return this.mapper.map(entity, TransactionDto, Transaction);
    }

    public MapEntity(dto: TransactionDto): Transaction
    {
        return this.mapper.map(dto, Transaction, TransactionDto);
    }

    public MapDtos(entities: Array<Transaction>): Array<TransactionDto>
    {
        return this.mapper.mapArray(entities, TransactionDto, Transaction);
    }

    public MapEntities(dtos: Array<TransactionDto>): Array<Transaction>
    {
        return this.mapper.mapArray(dtos, Transaction, TransactionDto);
    }

    public onBeforeInsert(dto: TransactionDto): Transaction
    {
        const value: Transaction = this.mapper.map(dto, Transaction, TransactionDto);
        value.id = 0;

        return value;
    }

    public onAfterInsert(entity: Transaction): TransactionDto
    {
        return this.MapDto(entity);
    }
}