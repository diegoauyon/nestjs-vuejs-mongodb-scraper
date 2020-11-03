import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';
import {ApiProperty} from '@nestjs/swagger';
import * as paginatePlugin from 'mongoose-paginate-v2';

export type BoatDocument = Boat & Document;

@Schema()
export class Boat {
    @ApiProperty({ type: Types.ObjectId, description: 'Boat Object ID' })
    @Prop({required: true})
    _id: Types.ObjectId;

    @ApiProperty({ type: String, description: 'Boat Model' })
    @Prop({required: false})
    boatModel: string;

    @ApiProperty({ type: String, description: 'Designer' })
    @Prop({required: false})
    designer: string;

    @ApiProperty({ type: String, description: 'Hull Type' })
    @Prop({required: false})
    hullType: string;

    @ApiProperty({ type: String, description: 'Rigging Type' })
    @Prop({required: false})
    riggingType: string;

    @ApiProperty({ type: String, description: 'Displacement' })
    @Prop({required: false})
    displacement: string;

    @ApiProperty({ type: String, description: 'LOA' })
    @Prop({required: false})
    loa: string;

    @ApiProperty({ type: String, description: 'LWL' })
    @Prop({required: false})
    lwl: string;

    @ApiProperty({ type: String, description: 'Beam' })
    @Prop({required: false})
    beam: string;

    @ApiProperty({ type: String, description: 'Draft' })
    @Prop({required: false})
    draft: string;

    @ApiProperty({ type: [String], description: 'Boat Images' })
    @Prop({
        type: [String],
        required: false
    })
    images: string[];
}

const BoatSchem = SchemaFactory.createForClass(Boat);
BoatSchem.plugin(paginatePlugin);

export const BoatSchema = BoatSchem;

export interface PaginateBoat {
    docs: {
        _doc: Boat
    }[];
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    nextPage: number;
    page: number;
    pagingCounter: number;
    prevPage: any;
    totalDocs: number;
    totalPages: number;
}

