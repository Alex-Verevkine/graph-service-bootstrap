import { Module, HttpModule, Logger } from '@nestjs/common';
// import { EntityRelationsRepositoryModule } from '@app/entity-relations-repository/entity-relations-repository.module';
import { EntityRelationsController } from '@app/application/entity-relations/entity-relations.controller';
// import { EntityRelationsService } from '@app/entity-relations/services/entity-relations.service';
// import { RelationsFetcherService } from '@app/entity-relations/services/relations-fetcher/relations-fetcher.service';
// import EntityRelationsMapper from '@app/entity-relations/services/entity-relations-mapper/entity-relations-mapper';

@Module({
  // imports: [HttpModule],
  imports: [],
  controllers: [EntityRelationsController],
  providers: [
    Logger,
    //   EntityRelationsService,
    //   // EntityRelationsMapper,
    //   // RelationsFetcherService,
  ],
})
export class EntityRelationsModule {}
