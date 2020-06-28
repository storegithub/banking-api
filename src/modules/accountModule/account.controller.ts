import { BaseController } from "src/generics/controller/base.controller";
import { AccountDto } from "src/models/account.dto";
import { Inject, Controller, Get, Param } from "@nestjs/common";
import { IAccountTypeService } from "./accountType.service";
import { IAccountService } from "./account.service";
import { PortfolioDto } from "src/models/portfolio.dto";


@Controller('account')
export class AccountController extends BaseController<AccountDto>
{

    private readonly accountService: IAccountService;
    private readonly accountTypeService: IAccountTypeService;

    constructor(@Inject('IAccountService') accountService: IAccountService, 
                @Inject('IAccountTypeService') accountTypeService: IAccountTypeService)
    {
        super(accountService);
        this.accountService = accountService;
        this.accountTypeService = accountTypeService;
    }

    @Get('portfolio/:customerId')
    public async get(@Param('customerId')customerId: number): Promise<PortfolioDto>
    {
        return await this.accountService.get(customerId);
    }

    @Get('newAccount')
    public async newAccount(): Promise<AccountDto>
    {
        return await this.accountService.getNewAccount();
    }
    
}