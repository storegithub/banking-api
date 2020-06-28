import { BaseService, IService } from "src/generics/service/base.service";
import { AccountType } from "src/entities/accountType.entity";
import { AccountTypeDto } from "src/models/accounttype.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { InjectMapper, AutoMapper } from "nestjsx-automapper";
import { Injectable } from "@nestjs/common";
import { SelectItem } from "src/models/selectitem";


export interface IAccountTypeService extends IService<AccountTypeDto>
{
    getAsDropDown(): Promise<SelectItem<string, string>[]>;
}

@Injectable()
export class AccountTypeService extends BaseService<AccountType, AccountTypeDto> implements IAccountTypeService
{
    constructor(@InjectRepository(AccountType) repository: Repository<AccountType>, @InjectMapper() mapper: AutoMapper)
    {
        super(repository, mapper);
    }

    public async getAsDropDown(): Promise<SelectItem<string, string>[]>
    {
        const data: AccountType[] = await this.repository.find();
         
        return data.map(item => 
        {
            let data: SelectItem<string, string> = new SelectItem<string, string>();
            data.value = item.code;
            data.text = item.name;
            return data;
        });
    }
 
    public MapDto(entity: AccountType): AccountTypeDto
    {
        return this.mapper.map(entity, AccountTypeDto, AccountType);
    }

    public MapEntity(dto: AccountTypeDto): AccountType
    {
        return this.mapper.map(dto, AccountType, AccountTypeDto);
    }

    public MapDtos(entities: Array<AccountType>): Array<AccountTypeDto>
    {
        return this.mapper.mapArray(entities, AccountTypeDto, AccountType);
    }

    public MapEntities(dtos: Array<AccountTypeDto>): Array<AccountType>
    {
        return this.mapper.mapArray(dtos, AccountType, AccountTypeDto);
    }

    public onBeforeInsert(dto: AccountTypeDto): AccountType
    {
        const value: AccountType = this.mapper.map(dto, AccountType, AccountTypeDto);
        value.id = 0;

        return value;
    }

    public onAfterInsert(entity: AccountType): AccountTypeDto
    {
        return this.MapDto(entity);
    }
}