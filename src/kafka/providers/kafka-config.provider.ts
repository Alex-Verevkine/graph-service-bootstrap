import { ConfigService } from '@nestjs/config';
import { KafkaOptions, Transport } from '@nestjs/microservices';
import { logLevel } from '@nestjs/microservices/external/kafka.interface';
import { MECHANISM } from '@app/kafka/common/kafka-enums';

const kafkaConfigProvider = {
  provide: 'KAFKA_CONFIG',
  useFactory: (config: ConfigService) => {
    const USERNAME = config.get('kafka.kafkaUser');
    const PASSWORD = config.get('kafka.kafkaPassword');
    const CLIENT_ID = config.get('kafka.clientId');

    const KAFKA_BROKERS = config.get('kafka.brokers');
    const KAFKA_CONSUMER = config.get('kafka.consumer');
    const NI_KAFKA_SSL = config.get('kafka.isSslEnabled');
    const KAFKA_CONNECTION_TIMEOUT = config.get('kafka.connectionTimeout');
    const KAFKA_RETRY = config.get('kafka.retry');

    const kafkaOptions: KafkaOptions = {
      transport: Transport.KAFKA,
      options: {
        client: {
          logLevel: logLevel.DEBUG,
          clientId: CLIENT_ID,
          brokers: KAFKA_BROKERS,
          connectionTimeout: KAFKA_CONNECTION_TIMEOUT,
          retry: KAFKA_RETRY,
        },
        consumer: KAFKA_CONSUMER,
      },
    };

    if (NI_KAFKA_SSL === 'true') {
      kafkaOptions.options.client.ssl = true;
      kafkaOptions.options.client.sasl = {
        mechanism: MECHANISM.PLAIN,
        username: USERNAME,
        password: PASSWORD,
      };
    }

    return kafkaOptions;
  },
  inject: [ConfigService],
};

export default kafkaConfigProvider;
