import {Test, TestingModule} from '@nestjs/testing';
import {BoatController} from './boat.controller';

describe('Boat Controller', () => {
    let module: TestingModule;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            controllers: [BoatController],
        }).compile();
    });
    it('should be defined', () => {
        const controller: BoatController = module.get<BoatController>(BoatController);
        expect(controller).toBeDefined();
    });
});
