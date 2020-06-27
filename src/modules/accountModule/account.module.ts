import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Account } from "src/entities/account.entity";
import { AccountType } from "src/entities/accountType.entity";
import { AccountController } from "./account.controller";
import { AccountService } from "./account.service";
import { AccountTypeService } from "./accountType.service";

@Module({
    imports: [TypeOrmModule.forFeature([Account, AccountType])],
    controllers:[
        AccountController
    ],
    providers: [
        { provide: "IAccountService", useClass: AccountService }, 
        { provide: "IAccountTypeService", useClass: AccountTypeService }
    ],
    exports: [
        { provide: "IAccountService", useClass: AccountService }, 
        { provide: "IAccountTypeService", useClass: AccountTypeService }
    ]
})
export class AccountModule{}