import { BaseController } from "src/generics/controller/base.controller";
import { BankDto } from "src/models/Bank.dto";
import { Inject, Controller } from "@nestjs/common";
import { IBankService } from "./Bank.service";

@Controller('bank')
export class BankController extends BaseController<BankDto>
{

    constructor(@Inject('IBankService') BankService: IBankService)
    {
        super(BankService);
    }

    
}