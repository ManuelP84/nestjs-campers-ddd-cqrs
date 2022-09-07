import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { BaseEntityRepository } from '../../database/base-entity.repository';
import { CamperSchema } from './schema/camper.schema';
import { Camper } from '../Camper';
import { CamperSchemaFactory } from './camper-schema.factory';

@Injectable()
export class CamperEntityRepository extends BaseEntityRepository<CamperSchema, Camper> {
    constructor(
        @InjectModel(CamperSchema.name)
        camperModel: Model<CamperSchema>,
        camperSchemaFactory: CamperSchemaFactory,
    ){
        super(camperModel, camperSchemaFactory);
    }
}