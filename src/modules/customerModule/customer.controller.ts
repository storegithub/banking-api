import { BaseController } from "src/generics/controller/base.controller";
import { Inject, Controller } from "@nestjs/common";
import { CustomerDto } from "src/models/customer.dto";
import { ICustomerService } from "./Customer.service";

@Controller('customer')
export class CustomerController extends BaseController<CustomerDto>
{

    constructor(@Inject('ICustomerService') customerService: ICustomerService)
    {
        super(customerService);
    }

    
}