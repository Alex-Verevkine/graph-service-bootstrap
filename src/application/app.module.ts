import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { NODE_ENVIRONMENTS } from './common/global-enums';
import mainConfig from './configuration/main';
import { WinstonModule } from 'nest-winston';
import kafkaConfigProvider from '@app/kafka/providers/kafka-config.provider';
import { EntityRelationsModule } from '@app/application/entity-relations/entity-relations.module';

@Module({
  imports: [
    WinstonModule,
    ConfigModule.forRoot({
      envFilePath: `./config/env/.${
        process.env.NODE_ENV || NODE_ENVIRONMENTS.DEVELOPMENT
      }.env`,
      load: [mainConfig],
    }),
    EntityRelationsModule,
  ],
  controllers: [AppController],
  providers: [Logger, AppService, kafkaConfigProvider],
})
export class AppModule {}
