import { Module } from '@nestjs/common';
import { BoatController } from './boat.controller';
import { BoatService } from './boat.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Boat, BoatSchema } from './schemas/boat.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Boat.name, schema: BoatSchema }])
  ],
  controllers: [BoatController],
  providers: [BoatService]
})
export class BoatModule { }
