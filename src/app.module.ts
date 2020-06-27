import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConnectService } from './dbConnect.service'; 
import { AuthModule } from './modules/authModule/auth.module';
import { AutomapperModule } from 'nestjsx-automapper';
import './mappings/source.profile';
import { UserModule } from './modules/userModule/user.module';
import { CustomerModule } from './modules/customerModule/customer.module';
import { BranchModule } from './modules/branchModule/branch.module';
import { BankModule } from './modules/bankModule/brank.module';
import { AccountModule } from './modules/accountModule/account.module';
import { AddressModule } from './modules/addressModule/address.module';
import { DictionaryModule } from './modules/dictionaryModule/dictionary.module';

@Module({
  imports: [ 
    TypeOrmModule.forRootAsync({ useClass: dbConnectService }), 
    AutomapperModule.withMapper(),
    AuthModule,
    UserModule,
    CustomerModule,
    BranchModule,
    BankModule,
    AccountModule,
    AddressModule,
    DictionaryModule
  ],  
  controllers: [
    
  ],
  providers: [
    
  ],
})
export class AppModule {}
