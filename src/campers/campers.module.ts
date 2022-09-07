import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CampersController } from './campers.controller';
import { CamperEntityRepository } from './db/camper-entity.repository';
import { CamperSchemaFactory } from './db/camper-schema.factory';
import { CamperFactory } from './camper.factory';
import { CamperEventHandlers } from './events';
import { CamperCommandHandlers } from './commands';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { CamperSchema } from './db/schema/camper.schema';
import { CammerQueryHandlers } from './queries';
import { CamperDtoRepository } from './db/camper-dto.repository';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: CamperSchema.name,
        schema: SchemaFactory.createForClass(CamperSchema),
      },
    ]),
  ],
  controllers: [CampersController],
  providers: [
    CamperEntityRepository,
    CamperDtoRepository,
    CamperSchemaFactory,
    CamperFactory,
    ...CamperEventHandlers,
    ...CamperCommandHandlers,
    ...CammerQueryHandlers,
  ],
})
export class CampersModule {}
