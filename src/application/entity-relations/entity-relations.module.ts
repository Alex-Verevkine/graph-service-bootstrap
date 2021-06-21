import { Module, Logger } from '@nestjs/common';
import { EntityRelationsController } from '@app/application/entity-relations/entity-relations.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  // imports: [HttpModule],
  imports: [],
  controllers: [EntityRelationsController],
  providers: [Logger, ConfigService],
})
export class EntityRelationsModule {}
