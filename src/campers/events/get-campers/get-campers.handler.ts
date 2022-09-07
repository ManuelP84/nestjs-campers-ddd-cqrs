import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { GetCampersEvent } from './get-campers.event';

@EventsHandler(GetCampersEvent)
export class GetCampersHandler implements IEventHandler<GetCampersEvent> {
  async handle(): Promise<void> {
    console.log('All campers requested');
  }
}
