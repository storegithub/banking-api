import { Module } from "@nestjs/common";
import { CustomerService } from "./Customer.service";
import { CustomerController } from "./Customer.controller";
import { Customer } from "src/entities/Customer.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AddressService } from "./address.service";
import { AddressModule } from "../addressModule/address.module";


@Module({
    imports: [TypeOrmModule.forFeature([Customer]), AddressModule],
    controllers:[
        CustomerController
    ],
    providers: [
        { provide: "ICustomerService", useClass: CustomerService }
    ],
    exports: [
        { provide: "ICustomerService", useClass: CustomerService }
    ]
})
export class CustomerModule{}