import { BaseController } from "src/generics/controller/base.controller";
import { AccountDto } from "src/models/account.dto";
import { Inject, Controller, Get, Param, UseGuards } from "@nestjs/common";
import { IAccountTypeService } from "./accountType.service";
import { IAccountService } from "./account.service";
import { PortfolioDto } from "src/models/portfolio.dto";
import { JwtAuthGuard } from "../authModule/auth.guard";


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

    @Get('portfolio/:userId')
    @UseGuards(JwtAuthGuard)
    public async get(@Param('userId')userId: number): Promise<PortfolioDto>
    {
        return await this.accountService.get(userId);
    }

    @Get('newAccount')
    @UseGuards(JwtAuthGuard)
    public async newAccount(): Promise<AccountDto>
    {
        return await this.accountService.getNewAccount();
    }

    // @Get('portfolio/:customerId')
    // @UseGuards(JwtAuthGuard)
    // public async getPortfolioId(@Param('userId')userId: number): Promise<PortfolioDto>
    // {
    //     return await this.accountService.get(userId);
    // }
    
}