import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Bank } from "src/entities/bank.entity";
import { BankController } from "./bank.controller";
import { BankService } from "./Bank.service";
import { AuthModule } from "../authModule/auth.module";
import { PassportModule } from "@nestjs/passport";
import { SharedModule } from "../shared/shared.module";

@Module({
    imports: [TypeOrmModule.forFeature([ Bank ]), PassportModule, SharedModule],
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