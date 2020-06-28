import { BaseController } from "src/generics/controller/base.controller";
import { CustomerDto } from "src/models/customer.dto";
import { Inject, Controller } from "@nestjs/common";
import { ICustomerService } from "./customer.service";

@Controller('customer')
export class CustomerController extends BaseController<CustomerDto>
{

    constructor(@Inject('ICustomerService') CustomerService: ICustomerService)
    {
        super(CustomerService);
    }

    
}