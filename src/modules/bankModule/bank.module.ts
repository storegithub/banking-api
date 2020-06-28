import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Bank } from "src/entities/bank.entity";
import { BankController } from "./bank.controller";
import { BankService } from "./Bank.service";

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