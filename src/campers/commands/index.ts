import { CreateCamperHandler } from './create-camper/create-camper.handler';
import { UpdateAllergiesHandler } from './update-camper/update-allergies.handler';

export const CamperCommandHandlers = [
  CreateCamperHandler,
  UpdateAllergiesHandler,
];
