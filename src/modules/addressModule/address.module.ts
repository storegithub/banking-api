import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Address } from "src/entities/address.entity";
import { AddressController } from "./address.controller"; 
import { AddressService } from "./address.service";
import { AuthModule } from "../authModule/auth.module";
import { PassportModule } from "@nestjs/passport";
import { SharedModule } from "../shared/shared.module";

@Module({
    imports: [TypeOrmModule.forFeature([Address]), PassportModule, SharedModule],
    controllers:[
        AddressController
    ],
    providers: [
        { provide: "IAddressService", useClass: AddressService }
    ],
    exports: [
        { provide: "IAddressService", useClass: AddressService }
    ]
})
export class AddressModule{}