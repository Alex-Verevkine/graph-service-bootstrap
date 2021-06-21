import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, KafkaOptions } from '@nestjs/microservices';
import { EventProducerController } from './event.producer.controller';

@Module({
  providers: [
    {
      provide: 'KAFKA_CLIENT',
      useFactory: (configService: ConfigService) => {
        const kafkaOptions = configService.get<KafkaOptions>('kafkaOptions');
        return ClientProxyFactory.create(kafkaOptions);
      },
      inject: [ConfigService],
    },
    ConfigService,
  ],
  controllers: [EventProducerController],
})
export class EventProducerModule {}
