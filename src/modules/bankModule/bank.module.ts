import { Module } from "@nestjs/common";
import { BankService } from "./Bank.service";
import { BankController } from "./Bank.controller";
import { Bank } from "src/entities/Bank.entity";
import { TypeOrmModule } from "@nestjs/typeorm";


@Module({
    imports: [TypeOrmModule.forFeature([Bank])],
    controllers:[
        BankController
    ],
    providers: [
        { provide: "IBankService", useClass: BankService }
    ],
    exports: [
        { provide: "IBankService", useClass: BankService }
    ]
})
export class BankModule{}