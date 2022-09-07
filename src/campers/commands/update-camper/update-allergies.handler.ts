import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { UpdateAllergiesCommand } from './update-allergies.command';
import { CamperEntityRepository } from '../../db/camper-entity.repository';

@CommandHandler(UpdateAllergiesCommand)
export class UpdateAllergiesHandler
  implements ICommandHandler<UpdateAllergiesCommand>
{
  constructor(
    private readonly camperEntityRepository: CamperEntityRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}
        
  async execute({ camperId, allergies }: UpdateAllergiesCommand): Promise<any> {
    const camper = this.eventPublisher.mergeObjectContext(
      await this.camperEntityRepository.findOneById(camperId),
    );
    camper.updateAllergies(allergies);
    await this.camperEntityRepository.findOneAndReplaceById(camperId, camper);
    camper.commit();
  }
}
