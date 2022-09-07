import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forRoot('mongodb+srv://manuelp84:Angie.cruz87@sofkacluster.jyaxe5e.mongodb.net/ddd')],
})
export class DatabaseModule {}
