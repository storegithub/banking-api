import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransactionController } from "./transaction.controller";
import { Transaction } from "src/entities/transaction.entity";
import { TransactionType } from "src/entities/transactionType.entity";
import { TransactionService } from "./transaction.service";
import { TransactionTypeService } from "./transactionType.service";
import { AuthModule } from "../authModule/auth.module";
import { PassportModule } from "@nestjs/passport";
import { SharedModule } from "../shared/shared.module";

@Module({
    imports: [TypeOrmModule.forFeature([Transaction, TransactionType]), AuthModule, PassportModule, SharedModule],
    controllers:[
        TransactionController
    ],
    providers: [
        { provide: "ITransactionService", useClass: TransactionService }, 
        { provide: "ITransactionTypeService", useClass: TransactionTypeService }
    ],
    exports: [
        { provide: "ITransactionService", useClass: TransactionService }, 
        { provide: "ITransactionTypeService", useClass: TransactionTypeService }
    ]
})
export class TransactionModule{}