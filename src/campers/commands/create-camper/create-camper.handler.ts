import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateCamperCommand } from './create-camper.command';
import { CamperFactory } from '../../camper.factory';
import { Logger } from '@nestjs/common';

@CommandHandler(CreateCamperCommand)
export class CreateCamperHandler
  implements ICommandHandler<CreateCamperCommand>
{
  constructor(
    private readonly camperFactory: CamperFactory,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({ createCamperRequest }: CreateCamperCommand): Promise<void> {
    const loggger = new Logger(CreateCamperHandler.name);

    const { name, age, allergies } = createCamperRequest;

    const camper = this.eventPublisher.mergeObjectContext(
      await this.camperFactory.create(name, age, allergies),
    );
    Logger.log('Camper created')
    camper.commit();
  }
}
