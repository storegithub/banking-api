import { IService, BaseService } from "src/generics/service/base.service";
import { Repository, InsertResult } from "typeorm";
import { InjectMapper, AutoMapper } from "nestjsx-automapper";
import { InjectRepository } from "@nestjs/typeorm";
import { TransactionDto } from "src/models/transaction.dto";
import { Transaction } from "src/entities/transaction.entity";
import { Injectable, Inject } from "@nestjs/common";
import { ITransactionTypeService } from "./transactionType.service";
import { response } from "express";
import { IAccountService } from "../accountModule/account.service";
import { Account } from "src/entities/account.entity";

export interface ITransactionService extends IService<TransactionDto>
{
    addTransaction(item: TransactionDto): Promise<TransactionDto>;
}

@Injectable()
export class TransactionService extends BaseService<Transaction, TransactionDto> implements ITransactionService
{
    private readonly transactionTypeService: ITransactionTypeService;
    private readonly accountService: IAccountService;

    constructor(@InjectRepository(Transaction) repository: Repository<Transaction>, 
        @InjectMapper() mapper: AutoMapper,
        @Inject('ITransactionTypeService') transactionTypeService: ITransactionTypeService,
        @Inject('IAccountService') accountService: IAccountService)
    {
        super(repository, mapper);
        this.transactionTypeService = transactionTypeService;
        this.accountService = accountService;
    }

    public async addTransaction(item: TransactionDto): Promise<TransactionDto>
    {
        try
        {
            const account: Account = await this.accountService.getEntityById(item.fromAccountId);
            if(account.amount < item.Amount)
                throw new Error();

            const newTrasaction: Transaction = new Transaction();
            newTrasaction.id = 0;
            newTrasaction.transactionType = await this.transactionTypeService.getEntityById(item.transactionTypeId);
            newTrasaction.fromAccount = account;
            newTrasaction.Amount = item.Amount;
            newTrasaction.accountNumber = item.accountNumber;
            newTrasaction.details = item.details;
            newTrasaction.mercant = item.mercant;
            newTrasaction.transactionDate = new Date();
             
            const result: InsertResult = await this.repository.insert(newTrasaction);

            const updateAccount: Account = await this.accountService.getEntityById(item.fromAccountId);
            updateAccount.amount -= newTrasaction.Amount;
            
            await this.accountService.updateEntity(updateAccount);

            return this.MapDto(newTrasaction);
        }
        catch(err)
        {
            return null;
        }
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