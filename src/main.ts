import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { Constants } from './constants'; 
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


const PORT: number =  3001;

async function bootstrap() { 
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('banking api')
    .setDescription('none')
    .setVersion('1.0')
    .addTag('swagger')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  app.setGlobalPrefix(Constants.GLOBAL_PREFIX);
  await app.listen(PORT);
  Logger.log(`Server running on http://localhost:${PORT}/${Constants.GLOBAL_PREFIX}`);
}
bootstrap();
