import { BaseController } from "src/generics/controller/base.controller";
import { AccountDto } from "src/models/account.dto";
import { Inject } from "@nestjs/common";
import { IAccountTypeService } from "./accountType.service";
import { IAccountService } from "./account.service";

export class AccountController extends BaseController<AccountDto>
{

    private readonly accountTypeService: IAccountTypeService;

    constructor(@Inject('IAccountService') accountService: IAccountService, 
                @Inject('IAccountTypeService') accountTypeService: IAccountTypeService)
    {
        super(accountService);
        this.accountTypeService = accountTypeService;
    }

    
}