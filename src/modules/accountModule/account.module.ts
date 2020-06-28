import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Account } from "src/entities/account.entity";
import { AccountType } from "src/entities/accountType.entity";
import { AccountController } from "./account.controller";
import { AccountService } from "./account.service";
import { AccountTypeService } from "./accountType.service";
import { DictionaryModule } from "../dictionaryModule/dictionary.module";
import { IbanService } from "./iban";

@Module({
    imports: [TypeOrmModule.forFeature([Account, AccountType]), DictionaryModule],
    controllers:[
        AccountController
    ],
    providers: [
        IbanService,
        { provide: "IAccountService", useClass: AccountService }, 
        { provide: "IAccountTypeService", useClass: AccountTypeService }
    ],
    exports: [
        IbanService,
        { provide: "IAccountService", useClass: AccountService }, 
        { provide: "IAccountTypeService", useClass: AccountTypeService }
    ]
})
export class AccountModule{}