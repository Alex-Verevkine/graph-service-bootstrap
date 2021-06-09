import { ApiOperation, ApiTags, ApiExcludeEndpoint } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Query,
} from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
// import { Entity } from '@app/entity-relations-repository/schema/entity.schema';
// import {
//   RELATION_TYPE,
//   VAR_TYPE,
// } from '@app/entity-relations-repository/common/enums';
// import { StatsDService } from '@naturalint/xsite-nest-datadog';
// import { EntityRelationsService } from './services/entity-relations.service';
// import { EntityRelationPayloadDto } from './interfaces/EntityRelationPayloadDto';
// import { EventPayload } from './interfaces/EventPayload';
// import { ParseBooleanPipe } from '../pipes/parse-boolean.pipe';

@Controller('relations')
@ApiTags('Entity API')
export class EntityRelationsController {
  // constructor() {
  //   // this.logger.log(`Subscribed to event: ${topicName}`);
  // }

  constructor(private readonly logger: Logger) {
    debugger;
    // this.logger.log(`Subscribed to event: ${topicName}`);
  }

  @EventPattern('crud-events')
  async handleEntityChangedEvent(payload: any) {
    this.logger.log('payload', JSON.stringify(payload));
    // this.logger.log(`Event: ${topicName}, Payload: ${JSON.stringify(payload)}`);
    debugger;
  }
}
