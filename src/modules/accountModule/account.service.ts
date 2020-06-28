import { IService, BaseService } from "src/generics/service/base.service";
import { AccountDto } from "src/models/account.dto";
import { Account } from "src/entities/account.entity";
import { Repository } from "typeorm";
import { InjectMapper, AutoMapper } from "nestjsx-automapper";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";

export interface IAccountService extends IService<AccountDto>
{

}

@Injectable()
export class AccountService extends BaseService<Account, AccountDto> implements IAccountService
{
    constructor(@InjectRepository(Account) repository: Repository<Account>, @InjectMapper() mapper: AutoMapper)
    {
        super(repository, mapper);
    }


    
    public MapDto(entity: Account): AccountDto
    {
        return this.mapper.map(entity, AccountDto, Account);
    }

    public MapEntity(dto: AccountDto): Account
    {
        return this.mapper.map(dto, Account, AccountDto);
    }

    public MapDtos(entities: Array<Account>): Array<AccountDto>
    {
        return this.mapper.mapArray(entities, AccountDto, Account);
    }

    public MapEntities(dtos: Array<AccountDto>): Array<Account>
    {
        return this.mapper.mapArray(dtos, Account, AccountDto);
    }

    public onBeforeInsert(dto: AccountDto): Account
    {
        const value: Account = this.mapper.map(dto, Account, AccountDto);
        value.id = 0;

        return value;
    }

    public onAfterInsert(entity: Account): AccountDto
    {
        return this.MapDto(entity);
    }
}