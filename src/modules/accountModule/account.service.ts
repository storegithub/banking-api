import { IService, BaseService } from "src/generics/service/base.service";
import { AccountDto } from "src/models/account.dto";
import { Account } from "src/entities/account.entity";
import { Repository } from "typeorm";
import { InjectMapper, AutoMapper } from "nestjsx-automapper";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, Inject } from "@nestjs/common";
import { PortfolioDto } from "src/models/portfolio.dto";
import { IDictionaryDetailService } from "../dictionaryModule/dictionaryDetail.service";
import { IAccountTypeService } from "./accountType.service"; 
import { Guid } from "guid-typescript"; 
import { IbanService } from "./iban";
import { UserService, IUserService } from "../userModule/user.service";

export interface IAccountService extends IService<AccountDto>
{
    get(userId: number): Promise<PortfolioDto>;
    getNewAccount(): Promise<AccountDto>;
}

@Injectable()
export class AccountService extends BaseService<Account, AccountDto> implements IAccountService
{
    private static eco: string = "eco";
    private static current: string = "current";
    private static depo: string = "depo";
    private static due: string = "due";

    private readonly dictionaryDetailService: IDictionaryDetailService;
    private readonly accountTypeService: IAccountTypeService;
    private readonly ibanService: IbanService;
    private readonly userService: IUserService;

    constructor(@InjectRepository(Account) repository: Repository<Account>, 
        @InjectMapper() mapper: AutoMapper,
        @Inject('IDictionaryDetailService') dictionaryDetailService: IDictionaryDetailService,
        @Inject('IAccountTypeService') accountTypeService: IAccountTypeService,
        @Inject('IUserService') userService: IUserService,
        ibanService: IbanService)
    {
        super(repository, mapper);
        this.dictionaryDetailService = dictionaryDetailService;
        this.accountTypeService = accountTypeService;
        this.ibanService = ibanService;
        this.userService=userService;
    }
    public async get(userId: number): Promise<PortfolioDto> {
        const portfolio: PortfolioDto = new PortfolioDto();
    
        const user = await this.userService.getById(userId);    
        const items = await this.repository.find({ relations: ['accountType', 'currency'], where: { customerId: user.customerId } });
        const customerAccounts: AccountDto[] = await this.mapper.mapArrayAsync(items, AccountDto, Account);

        portfolio.economies = customerAccounts.filter(item => item.type == AccountService.eco);
        portfolio.currentAccounts = customerAccounts.filter(item => item.type == AccountService.current);
        portfolio.deposits = customerAccounts.filter(item => item.type == AccountService.depo);
        portfolio.dues = customerAccounts.filter(item => item.type == AccountService.due);

        portfolio.amount = items.map(item => item.amount).reduce((previous, current) => previous + current, 0);
        return portfolio;
    }

    public async getNewAccount(): Promise<AccountDto>
    {
        const item: AccountDto = new AccountDto();

        item.currencies =  await this.dictionaryDetailService.getAsDropDown('currency');
        item.accountTypes =  await this.accountTypeService.getAsDropDown();

        item.accountNumber = this.ibanService.newAccountNumber();
        item.iban = this.ibanService.newIban(item.accountNumber);

        return item;
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