import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('relations')
@ApiTags('Entity API')
export class EntityRelationsController {
  constructor(readonly logger: Logger, readonly config: ConfigService) {}

  @EventPattern('crud-events')
  async handleEntityChangedEvent(payload: any) {
    this.logger.log('payload', JSON.stringify(payload));
  }
}
