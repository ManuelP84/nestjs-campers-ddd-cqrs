import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CamperDto } from '../dto/camper.dto';
import { CamperSchema } from './schema/camper.schema';

@Injectable()
export class CamperDtoRepository {
  constructor(
    @InjectModel(CamperSchema.name)
    private readonly camperModel: Model<CamperSchema>,
  ) {}

  async findAll(): Promise<CamperDto[]> {
    const campers = await this.camperModel.find({}, {}, { lean: true });
    return campers.map((camper) => {
      const allergiesToLower = camper.allergies.map((allergy) =>
        allergy.toLocaleLowerCase(),
      );
      const isAllergicToPeanuts = allergiesToLower.includes('peanuts');
      return {
        ...camper,
        isAllergicToPeanuts,
      };
    });
  }
}
