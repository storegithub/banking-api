import { Module } from "@nestjs/common";
import { CustomerService } from "./Customer.service";
import { CustomerController } from "./Customer.controller";
import { Customer } from "src/entities/Customer.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AddressService } from "./address.service";


@Module({
    imports: [TypeOrmModule.forFeature([Customer])],
    controllers:[
        CustomerController
    ],
    providers: [
        { provide: "ICustomerService", useClass: CustomerService },
        { provide: "IAddressService", useClass: AddressService }
    ],
    exports: [
        { provide: "ICustomerService", useClass: CustomerService },
        { provide: "IAddressService", useClass: AddressService }
    ]
})
export class CustomerModule{}