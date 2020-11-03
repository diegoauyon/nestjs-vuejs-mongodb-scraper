import {Boat} from '../schemas/boat.schema'
import {Types} from 'mongoose';

export interface ILink {
    rel: IBoatLinkType | IPageLinkType;
    method: string;
    href: string;
}

export type IBoatLinkType = 'self' | 'update' | 'delete';
export type IPageLinkType = 'next' | 'prev';

export interface ISingleBoatResponseDTO
    extends Omit<Boat, 'createdAt' | 'modifiedAt'> {
    links: ILink[];
}

export interface IAllBoatsResponseDTO {
    totalCount: number;
    perPage: number;
    pageNumber: number;
    boats: ISingleBoatResponseDTO[];
    links: ILink[];
}

export type IBoatForCreationDTO = Omit<
    Boat,
    '_id' | 'createdAt' | 'modifiedAt'
    >;

export type IBoatForResponseDTO = Omit<Boat, 'createdAt' | 'modifiedAt'>;
export type IBoatForUpdateDTO = Partial<IBoatForCreationDTO>;

export class BoatForCreationDTO implements  IBoatForCreationDTO{
    _id: Types.ObjectId;
    beam: string;
    boatModel: string;
    designer: string;
    displacement: string;
    draft: string;
    hullType: string;
    images: string[];
    loa: string;
    lwl: string;
    riggingType: string;

}

export class BoatForUpdateDTO implements IBoatForUpdateDTO {

}

export class SingleBoatResponseDTO implements  ISingleBoatResponseDTO {
    _id: Types.ObjectId;
    beam: string;
    boatModel: string;
    designer: string;
    displacement: string;
    draft: string;
    hullType: string;
    images: string[];
    links: ILink[];
    loa: string;
    lwl: string;
    riggingType: string;
}

export class AllBoatsResponseDTO implements IAllBoatsResponseDTO {
    boats: SingleBoatResponseDTO[];
    links: ILink[];
    pageNumber: number;
    perPage: number;
    totalCount: number;
}
