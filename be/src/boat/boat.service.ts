import { Injectable } from '@nestjs/common';
import { Model,Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {Boat, BoatDocument, PaginateBoat} from './schemas/boat.schema';
import {IBoatForCreationDTO, IBoatForUpdateDTO} from "./dto/hateoas.dto";

@Injectable()
export class BoatService {

    constructor(@InjectModel(Boat.name) private readonly boatModel: Model<BoatDocument>) { }

    async getBoats(): Promise<Boat[]> {
        const boats = await this.boatModel.find().exec();
        return boats;
    }

    async searchBoats({page, limit} = { page: 1, limit: 10}): Promise<PaginateBoat>{
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const boats = await this.boatModel.paginate({}, {
            page, limit
        });
        return boats;
    }

    async getBoat(boatID): Promise<Boat> {
        const boat = await this.boatModel
            .findOne({_id:  new Types.ObjectId(boatID)})
            .exec();
        return boat;
    }

    async addBoat(boat: IBoatForCreationDTO): Promise<Boat> {
        const newBoat = await new this.boatModel(boat);
        return newBoat.save();
    }

    async editBoat(boatID, boat: IBoatForUpdateDTO): Promise<Boat> {
        const editedBoat = await this.boatModel
            .findByIdAndUpdate(boatID, boat, { new: true });
        return editedBoat;
    }

    async deleteBoat(boatID): Promise<any> {
        const deletedBoat = await this.boatModel
            .findOne({_id:  new Types.ObjectId(boatID)})
            .remove()
        return deletedBoat;
    }

}
