import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NODE_ENVIRONMENTS } from './common/global-enums';
import mainConfig from './configuration/main';
import { WinstonModule } from 'nest-winston';
import { EntityRelationsModule } from '@app/application/entity-relations/entity-relations.module';
import { EventProducerModule } from './event-producer/event-producer.module';

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
    EventProducerModule,
  ],
  controllers: [AppController],
  providers: [Logger, AppService, ConfigService],
  exports: [ConfigService],
})
export class AppModule {}
