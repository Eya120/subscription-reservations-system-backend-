import { Test, TestingModule } from '@nestjs/testing';
import { AccesService } from './acces.service';

describe('AccesService', () => {
  let service: AccesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccesService],
    }).compile();

    service = module.get<AccesService>(AccesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
