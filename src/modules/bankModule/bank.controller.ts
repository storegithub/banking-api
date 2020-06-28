import { BaseController } from "src/generics/controller/base.controller";
import { Inject, Controller } from "@nestjs/common";
import { BankDto } from "src/models/bank.dto";
import { IBankService } from "./Bank.service";

@Controller('bank')
export class BankController extends BaseController<BankDto>
{
    constructor(@Inject('IBankService') bankService: IBankService)
    {
        super(bankService);
    }

    
}