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
import { BankModule } from './modules/bankModule/bank.module';
import { AccountModule } from './modules/accountModule/account.module';
import { AddressModule } from './modules/addressModule/address.module';
import { DictionaryModule } from './modules/dictionaryModule/dictionary.module';
import { AboutModule } from './modules/aboutModule/about.module';
import { TransactionModule } from './modules/transactionModule/transaction.module';
import { ContactModule } from './modules/contactModule/contact.module';
import { SharedModule } from './modules/shared/shared.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

@Module({
  imports: [ 
    TypeOrmModule.forRootAsync({ useClass: dbConnectService }), 
    AutomapperModule.withMapper(),
    AboutModule,
    AccountModule,
    AddressModule,
    AuthModule,
    BankModule,
    BranchModule,
    ContactModule,
    CustomerModule,
    DictionaryModule,
    TransactionModule,
    UserModule,
    SharedModule,
    MailerModule.forRootAsync({ 
      useFactory: () => ({
        transport: 'smtps://replayn.homebank@gmail.com:1Asdfghj@smtp.gmail.com',
        defaults: {
          from:'"nest-modules" modules@nestjs.com',
        },
        template: {
          dir: __dirname + '/templates',
          adapter: new PugAdapter(),
          options: {
            strict: true,
          },
        },
      }) 
    })
  ],  
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule {}
