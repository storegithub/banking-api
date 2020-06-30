import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Customer } from "src/entities/customer.entity";
import { AddressModule } from "../addressModule/address.module";
import { CustomerService } from "./Customer.service";
import { AuthModule } from "../authModule/auth.module";
import { PassportModule } from "@nestjs/passport";
import { SharedModule } from "../shared/shared.module";

@Module({
    imports: [TypeOrmModule.forFeature([Customer]), AddressModule, PassportModule, SharedModule],
    controllers:[
    ],
    providers: [
        { provide: "ICustomerService", useClass: CustomerService }
    ],
    exports: [
        { provide: "ICustomerService", useClass: CustomerService }
    ]
})
export class CustomerModule{}