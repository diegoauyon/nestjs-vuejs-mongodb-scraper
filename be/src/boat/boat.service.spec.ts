import { Test, TestingModule } from '@nestjs/testing';
import { BoatService } from './boat.service';

describe('BlogService', () => {
  let service: BoatService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoatService],
    }).compile();
    service = module.get<BoatService>(BoatService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
