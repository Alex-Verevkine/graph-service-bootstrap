import { v4 as uuidv4 } from 'uuid';
import { KafkaOptions, Transport } from '@nestjs/microservices';
import { logLevel } from '@nestjs/microservices/external/kafka.interface';
import { MECHANISM } from '@app/kafka/common/kafka-enums';

export default () => {
  const kafkaOptions: KafkaOptions = {
    transport: Transport.KAFKA,
    options: {
      client: {
        logLevel: logLevel.DEBUG,
        clientId: `${process.env.KAFKA_CLIENT_ID_PREFIX}-${uuidv4()}`,
        brokers: [process.env.KAFKA_BROKER],
        connectionTimeout: parseInt(process.env.KAFKA_CONNECTION_TIMEOUT, 10),
        retry: {
          retries: parseInt(process.env.KAFKA_RETRIES, 10),
        },
      },
      consumer: {
        groupId: process.env.KAFKA_CONSUMER_GROUP_ID,
        heartbeatInterval: parseInt(process.env.KAFKA_HEARTBEAT_INTERVAL, 10),
        sessionTimeout: parseInt(process.env.KAFKA_SESSION_TIMEOUT, 10),
      },
    },
  };

  if (process.env.NI_KAFKA_SSL === 'true') {
    kafkaOptions.options.client.ssl = true;
    kafkaOptions.options.client.sasl = {
      mechanism: MECHANISM.PLAIN,
      username: process.env.KAFKA_USER,
      password: process.env.KAFKA_PASSWORD,
    };
  }

  return {
    env: {
      name: process.env.NODE_ENV,
    },
    application: {
      serviceName: process.env.SERVICE_NAME,
      port: parseInt(process.env.PORT, 10),
    },
    swagger: {
      title: process.env.SWAGGER_TITLE,
      description: process.env.SWAGGER_DESCRIPTION,
      version: process.env.SWAGGER_VERSION,
    },
    kafkaOptions,
    kafkaTopic: process.env.KAFKA_TOPIC,
  };
};
