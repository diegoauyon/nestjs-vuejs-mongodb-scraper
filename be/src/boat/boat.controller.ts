import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    NotFoundException,
    Param,
    Post,
    Put,
    Query,
    Req,
    Res
} from '@nestjs/common';
import {BoatService} from './boat.service';
import {Boat, PaginateBoat} from './schemas/boat.schema';
import {ValidateObjectId} from '../shared/pipes/validate-object-id.pipes';
import {ApiOkResponse, ApiOperation, ApiTags} from '@nestjs/swagger';
import {mapBoatLinksByType, mapPageLinks} from './helpers';
import {Request} from 'express';
import {
    AllBoatsResponseDTO,
    BoatForCreationDTO,
    BoatForUpdateDTO,
    IAllBoatsResponseDTO,
    IBoatForCreationDTO,
    IBoatForUpdateDTO,
    IBoatLinkType,
    ISingleBoatResponseDTO,
    SingleBoatResponseDTO
} from './dto/hateoas.dto';

@ApiTags('Boat')
@Controller('boats')
export class BoatController {

    constructor(private boatService: BoatService) {
    }

    // Fetch all boats
    @ApiOperation({
        operationId: 'Fetch all boats',
        summary: 'Fetch all boats',
        description: 'Fetch all boats',
    })
    @ApiOkResponse({
        description: 'Fetch all boats',
        type: AllBoatsResponseDTO
    })
    @Get('')
    async getBoats(@Res() res,
                   @Req() req: Request,
                   @Query('pageNumber') pageNumber: string,
                   @Query('perPage') perPage: string,
    ): Promise<IAllBoatsResponseDTO> {
        const options = {
            page: parseInt(pageNumber, 10) || 1,
            limit: parseInt(perPage, 10) || 10,
        }
        const paginateBoat: PaginateBoat = await this.boatService.searchBoats(options);

        const mapBoatsLinks = mapBoatLinksByType(['self'], req);
        const boatsData = paginateBoat.docs.map(boat => ({
            ...boat._doc,
            links: mapBoatsLinks(boat._doc),
        }));

        const pageLinks = mapPageLinks(
            paginateBoat,
            req,
        );

        const response = {
            totalCount: paginateBoat.totalDocs,
            totalPages: paginateBoat.totalPages,
            perPage: paginateBoat.limit,
            pageNumber: paginateBoat.page,
            boats: boatsData,
            links: pageLinks,
        };

        return res.status(HttpStatus.OK).json(response);
    }

    // Fetch a particular boat using ID
    @ApiOperation({
        operationId: 'Fetch a particular boat using ID',
        summary: 'Fetch a particular boat using ID',
        description: 'Fetch a particular boat using ID',
    })
    @ApiOkResponse({
        description: 'Fetch a particular boat using ID',
        type: SingleBoatResponseDTO,
    })
    @Get(':boatID')
    async getBoat(@Res() res, @Param('boatID', new ValidateObjectId()) boatID): Promise<ISingleBoatResponseDTO> {
        const boat = await this.boatService.getBoat(boatID);
        if (!boat) throw new NotFoundException('Boat does not exist!');
        return res.status(HttpStatus.OK).json(boat);

    }

    // Submit a boat
    @ApiOperation({
        operationId: 'Submit a boat',
        summary: 'Submit a boat',
        description: 'Submit a boat',
    })
    @ApiOkResponse({
        description: 'Submit a boat',
        type: BoatForCreationDTO,
    })
    @Post('')
    async addBoat(@Res() res, @Body() boat: IBoatForCreationDTO,
                  @Req() request: Request) {
        const newBoat = await this.boatService.addBoat(boat);

        const linkTypes: IBoatLinkType[] = ['update', 'delete'];

        const mapBoatLinks = mapBoatLinksByType(linkTypes, request);
        const response = {...newBoat, links: mapBoatLinks(newBoat)};

        return res.status(HttpStatus.OK).json(response);
    }

// Edit a particular boat using ID
    @ApiOperation({
        operationId: 'Edit a particular boat using ID',
        summary: 'Edit a particular boat using ID',
        description: 'Edit a particular boat using ID',
    })
    @ApiOkResponse({
        description: 'Edit a particular boat using ID',
        type: BoatForUpdateDTO,
    })
    @Put('')
    async editBoat(@Res() res,
                   @Query('boatID', new ValidateObjectId())
                       boatID,
                   @Body()
                       boat: IBoatForUpdateDTO
    ) {
        const editedBoat = await this.boatService.editBoat(boatID, boat);
        if (!editedBoat) throw new NotFoundException('Boat does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Boat has been successfully updated',
            boat: editedBoat
        })
    }

// Delete a boat using ID
    @ApiOperation({
        operationId: 'Delete a boat using ID',
        summary: 'Delete a boat using ID',
        description: 'Delete a boat using ID',
    })
    @ApiOkResponse({
        description: 'Delete a boat using ID',
        type: [Boat],
    })
    @Delete(':boatID')
    async deleteBoat(@Res() res, @Param('boatID', new ValidateObjectId()) boatID) {
        const deletedBoat = await this.boatService.deleteBoat(boatID);
        if (!deletedBoat) throw new NotFoundException('Boat does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Boat has been deleted!',
            boat: deletedBoat
        })
    }
}
