import { IService, BaseService } from "src/generics/service/base.service";
import { AccountDto } from "src/models/account.dto";
import { Account } from "src/entities/account.entity";
import { Repository, InsertResult } from "typeorm";
import { InjectMapper, AutoMapper } from "nestjsx-automapper";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, Inject } from "@nestjs/common";
import { PortfolioDto } from "src/models/portfolio.dto";
import { IDictionaryDetailService } from "../dictionaryModule/dictionaryDetail.service";
import { IAccountTypeService } from "./accountType.service"; 
import { Guid } from "guid-typescript"; 
import { IbanService } from "./iban";
import { UserService, IUserService } from "../userModule/user.service";
import { OperationResult } from "src/models/operation.result.dto";
import { AccountType } from "src/entities/accountType.entity";

export interface IAccountService extends IService<AccountDto>
{
    get(userId: number): Promise<PortfolioDto>;
    getNewAccount(): Promise<AccountDto>;
    getEntityById(id: number): Promise<Account>;
    updateEntity(entity: Account): Promise<any> ;
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
    
    async updateEntity(entity: Account): Promise<any> 
    {
        await this.repository.update(entity.id , entity);
    }

    async getEntityById(id: number): Promise<Account> {
        return await this.repository.findOne({ where: { id: id }, relations: ['accountType', 'currency'] });
    }
    public async get(userId: number): Promise<PortfolioDto> {
        const portfolio: PortfolioDto = new PortfolioDto();
    
        const user = await this.userService.getById(userId);    
        const items = await this.repository.find({ relations: ['accountType', 'currency'], where: { customerId: user.customerId } });
        const customerAccounts: AccountDto[] = await this.mapper.mapArrayAsync(items, AccountDto, Account);

        portfolio.economies = customerAccounts.filter(item => item.accountType == AccountService.eco);
        portfolio.currentAccounts = customerAccounts.filter(item => item.accountType == AccountService.current);
        portfolio.deposits = customerAccounts.filter(item => item.accountType == AccountService.depo);
        portfolio.dues = customerAccounts.filter(item => item.accountType == AccountService.due);

        portfolio.amount = items.map(item => item.amount).reduce((previous, current) => previous + current, 0);
        return portfolio;
    }

    public async getById(id: number): Promise<AccountDto>
    {
        let item: AccountDto = null;
        try
        {
            const entity: Account = await this.repository.findOne({ where: { id: id }, relations: ['accountType', 'currency'] });

            item = this.MapDto(entity);
        }
        catch(error)
        {
            console.log(error);
        }
        return item;
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

    public async insert(dto: AccountDto): Promise<OperationResult<AccountDto>>
    {
        let response: OperationResult<AccountDto> = new OperationResult<AccountDto>();
        try
        {
            const { customerId } = await this.userService.getById(dto.userId);

            const value: Account =new Account();
            value.id = 0;
            value.accountNumber = dto.accountNumber;
            value.amount = dto.amount;
            value.customerId = customerId;
            value.displayName = dto.displayName;
            value.iban = dto.iban;

            value.accountType = await this.accountTypeService.getByCode(dto.accountType)
            value.currency=await this.dictionaryDetailService.getByName(dto.currency);
            

            const result: InsertResult = await this.repository.insert(value);

            value.id = result.raw.insertedId; 
            
            response.data = new AccountDto();
            response.data.accountNumber=dto.accountNumber;
            response.data.accountTypes=dto.accountTypes;
            response.data.amount=dto.amount;
            response.data.currencies=dto.currencies;
            response.data.currency=dto.currency;
            response.data.currencyValue=dto.currencyValue;
            response.data.customerId=dto.customerId;
            response.data.displayName=dto.displayName;
            response.data.iban=dto.iban;
            response.data.id=response.data.id;
            response.data.accountType=dto.accountType;

            response.success = true;
        }
        catch(error)
        {
            response.message = error.message;
        }
        return response;
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
        const value: Account =new Account();
        value.id=0;
        value.accountNumber=dto.accountNumber;
        value.amount=dto.amount;
        value.customerId=dto.customerId;
        value.displayName=dto.displayName;
        value.iban=dto.iban;

        return value;
    }

    public onAfterInsert(entity: Account): AccountDto
    {
        return this.MapDto(entity);
    }
}