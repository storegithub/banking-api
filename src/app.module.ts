import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConnectService } from './dbConnect.service'; 
import { AuthModule } from './modules/authModule/auth.module';
import { AutomapperModule } from 'nestjsx-automapper';
import './mappings/source.profile';
import { UserModule } from './modules/userModule/user.module';

@Module({
  imports: [ 
    TypeOrmModule.forRootAsync({ useClass: dbConnectService }), 
    AutomapperModule.withMapper(),
    AuthModule,
    UserModule
  ],  
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule {}
