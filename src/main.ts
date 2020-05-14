import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { Constants } from './constants'; 


const PORT: number =  3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix(Constants.GLOBAL_PREFIX);
  await app.listen(PORT);
  Logger.log(`Server running on http://localhost:${PORT}/${Constants.GLOBAL_PREFIX}`);
}
bootstrap();
