import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Address } from "src/entities/address.entity";
import { AddressController } from "./address.controller"; 
import { AddressService } from "./address.service";

@Module({
    imports: [TypeOrmModule.forFeature([Address])],
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