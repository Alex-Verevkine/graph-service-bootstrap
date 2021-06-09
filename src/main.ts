import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './application/app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const logger = app.get(Logger);

  const kafkaConfig = app.get('KAFKA_CONFIG');

  const swaggerConfig = new DocumentBuilder()
    .setTitle(configService.get<string>('swagger.title'))
    .setDescription(configService.get<string>('swagger.description'))
    .setVersion(configService.get<string>('swagger.version'))
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  app.connectMicroservice(kafkaConfig);
  logger.log('Initializing Kafka microservice');

  await app.startAllMicroservicesAsync();
  logger.log('Micro-Services started successfully');

  await app.listen(configService.get<number>('application.port'));
}
bootstrap();
