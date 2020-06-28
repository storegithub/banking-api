import { BaseController } from "src/generics/controller/base.controller";
import { AddressDto } from "src/models/Address.dto";
import { Inject, Controller } from "@nestjs/common"; 
import { IAddressService } from "./address.service";

@Controller('address')
export class AddressController extends BaseController<AddressDto>
{

    constructor(@Inject('IAddressService') addressService: IAddressService)
    {
        super(addressService);
    }

    
}