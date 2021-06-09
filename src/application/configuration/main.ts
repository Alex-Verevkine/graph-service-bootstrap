import { v4 as uuidv4 } from 'uuid';
export default () => ({
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
  kafka: {
    kafkaUser: process.env.KAFKA_USER,
    kafkaPassword: process.env.KAFKA_PASSWORD,
    kafkaClientId: process.env.KAFKA_CLIENT_ID,
    isSslEnabled: process.env.NI_KAFKA_SSL,
    clientId: `${process.env.KAFKA_CLIENT_ID_PREFIX}-${uuidv4()}`,
    brokers: [process.env.KAFKA_BROKER],
    connectionTimeout: process.env.KAFKA_CONNECTION_TIMEOUT,
    consumer: {
      groupId: process.env.KAFKA_CONSUMER_GROUP_ID,
      heartbeatInterval: parseInt(process.env.KAFKA_HEARTBEAT_INTERVAL, 10),
      sessionTimeout: parseInt(process.env.KAFKA_SESSION_TIMEOUT, 10),
    },
    retry: {
      retries: process.env.KAFKA_RETRIES,
    },
  },
});
