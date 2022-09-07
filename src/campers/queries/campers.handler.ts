import {
  IQueryHandler,
  QueryHandler,
  EventPublisher,
  EventBus,
} from '@nestjs/cqrs';
import { CamperDto } from '../dto/camper.dto';
import { CampersQuery } from './campers.query';
import { CamperDtoRepository } from '../db/camper-dto.repository';
import { GetCampersEvent } from '../events/get-campers/get-campers.event';

@QueryHandler(CampersQuery)
export class Campershandler implements IQueryHandler<CampersQuery> {
  constructor(
    private readonly campersDtoRepository: CamperDtoRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(): Promise<CamperDto[]> {
    this.eventBus.publish(new GetCampersEvent());
    return this.campersDtoRepository.findAll();
  }
}
