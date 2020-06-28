import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Customer } from "src/entities/customer.entity";
import { CustomerController } from "./customer.controller";
import { AddressModule } from "../addressModule/address.module";
import { CustomerService } from "./Customer.service";

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