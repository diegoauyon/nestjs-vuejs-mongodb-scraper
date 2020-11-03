import { Request } from 'express';

import { IBoatForResponseDTO, IBoatLinkType, ILink  } from './dto/hateoas.dto';
import {PaginateBoat} from './schemas/boat.schema';

export const sortableFields = ['boatModel', 'designer', 'hullType'];

export const getUrl = (request: Request) => `http://${request.headers.host}`;

export const mapBoatLinksByType = (
    types: IBoatLinkType[],
    request: Request,
) => (boat: IBoatForResponseDTO): ILink[] => {
    const url = getUrl(request);
    const mapLinks = mapSingleBoatLink(boat, url);

    return types.map(mapLinks);
};

export const mapSelfLink = (
    boat: IBoatForResponseDTO,
    url: string,
): ILink => ({
    rel: 'self',
    method: 'GET',
    href: `${url}/boats/${boat._id}`,
});

export const mapUpdateLink = (
    boat: IBoatForResponseDTO,
    url: string,
): ILink => ({
    rel: 'update',
    method: 'PUT',
    href: `${url}/boats/${boat._id}`,
});

export const mapDeleteLink = (
    boat: IBoatForResponseDTO,
    url: string,
): ILink => ({
    rel: 'delete',
    method: 'DELETE',
    href: `${url}/boats/${boat._id}`,
});

export const mapSingleBoatLink = (
    boat: IBoatForResponseDTO,
    url: string,
) => (type: IBoatLinkType): ILink => {
    switch (type) {
        case 'self':
            return mapSelfLink(boat, url);
        case 'update':
            return mapUpdateLink(boat, url);
        case 'delete':
            return mapDeleteLink(boat, url);

        default:
            return null;
    }
};

export const mapNextPageLink = (
    perPage: number,
    pageNumber: number,
    url: string,
): ILink => ({
    rel: 'next',
    method: 'GET',
    href: `${url}/boats?pageNumber=${pageNumber}&perPage=${perPage}`,
});

export const mapPreviousPageLink = (
    perPage: number,
    pageNumber: number,
    url: string,
): ILink => ({
    rel: 'prev',
    method: 'GET',
    href: `${url}/boats?pageNumber=${pageNumber}&perPage=${perPage}`,
});

export const mapPageLinks = (
    paginateBoat: PaginateBoat,
    request: Request,
) => {
    const links = [];
    const url = getUrl(request);

    if (paginateBoat.hasPrevPage) {
        links.push(mapPreviousPageLink(paginateBoat.limit, paginateBoat.prevPage, url));
    }

    if (paginateBoat.hasNextPage) {
        links.push(mapNextPageLink(paginateBoat.limit, paginateBoat.nextPage, url));
    }

    return links;
};

export const getSortCondition = (sortFields: string[]) => (
    field: string,
    order: 'ASC' | 'DESC',
) => {
    return sortFields.includes(field) ? { [field]: order } : {};
};

export const getSortOrder = (order: string | null) =>
    order && order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

const appendSortConditionToLink = (sortBy: string, order: string) => (
    link: ILink,
) => {
    link.href += `&sortBy=${sortBy}&order=${order}`;
};
