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
import { AccountDto } from "src/models/account.dto";
import { isNullOrUndefined } from "util";
import { IDictionaryDetailService } from "../dictionaryModule/dictionaryDetail.service";

export interface ITransactionService extends IService<TransactionDto>
{
    addTransaction(item: TransactionDto): Promise<TransactionDto>;
    newTransaction(accountId: number): Promise<TransactionDto>;
    accountTransactions(accountId: number): Promise<TransactionDto[]>;
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
            const transactionAmount: number = Number(item.amount);
            if(transactionAmount== null || transactionAmount < 1) throw new Error();
            if(isNullOrUndefined(item.partner)) throw new Error();
            if(isNullOrUndefined(item.accountNumber)) throw new Error();

            const account: Account = await this.accountService.getEntityById(item.fromAccountId);
            if(account.amount < transactionAmount) throw new Error("Sold indisponibil!");
                 
            const newTrasaction: Transaction = new Transaction();
            newTrasaction.id = 0;
            newTrasaction.transactionType = await this.transactionTypeService.getEntityByName(item.transactionType);
            newTrasaction.fromAccount = account;
            newTrasaction.amount = transactionAmount;
            newTrasaction.accountNumber = item.accountNumber;
            newTrasaction.details = item.description;
            newTrasaction.mercant = item.partner;
            newTrasaction.currency = account.currency;
            newTrasaction.transactionDate = new Date();
             
            const result: InsertResult = await this.repository.insert(newTrasaction);

            const updateAccount: Account = await this.accountService.getEntityById(item.fromAccountId);
            updateAccount.amount -= transactionAmount;
            
            await this.accountService.updateEntity(updateAccount);

            return this.MapDto(newTrasaction);
        }
        catch(err)
        {
            return null;
        }
    }

    public async newTransaction(accountId: number): Promise<TransactionDto>
    {
        const account: AccountDto = await this.accountService.getById(accountId)
        const transaction: TransactionDto = new TransactionDto();
        transaction.fromAccountId = account.id;  
        transaction.fromAccount = account.displayName;  
        transaction.fromAccountNumber = account.accountNumber;  
        transaction.currency = account.currency;
        transaction.transactionType = "Debit";

        return transaction;
    }

    public async accountTransactions(accountId: number): Promise<TransactionDto[]>
    {
        const items: Transaction[] = await this.repository.find({ where: { fromAccount: { id: accountId } }, relations: ['currency', 'transactionType'] });
        return this.MapDtos(items);
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