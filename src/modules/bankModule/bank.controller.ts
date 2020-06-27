import { BaseController } from "src/generics/controller/base.controller";
import { BankDto } from "src/models/Bank.dto";
import { Inject } from "@nestjs/common";
import { IBankService } from "./Bank.service";

export class BankController extends BaseController<BankDto>
{

    constructor(@Inject('IBankService') BankService: IBankService)
    {
        super(BankService);
    }

    
}