import { Controller, Inject, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { CompressionTypes } from '@nestjs/microservices/external/kafka.interface';

@Controller('entity')
export class EventProducerController {
  constructor(
    @Inject('KAFKA_CLIENT') private client: ClientProxy,
    private config: ConfigService,
  ) {
    debugger;

    console.log('client', client);
  }

  @Post('')
  async createEntity() {
    try {
      debugger;
      const topic = this.config.get<string>('kafkaTopic');
      const c = await this.client.connect();
      await c.send({
        messages: [
          {
            value: JSON.stringify({ name: 'test msg' }),
          },
        ],
        topic,
        compression: CompressionTypes.GZIP,
      });
      debugger;
    } catch (error) {
      debugger;
    }
  }
}
