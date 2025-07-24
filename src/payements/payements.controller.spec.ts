import { Test, TestingModule } from '@nestjs/testing';
import { PayementsController } from './payements.controller';

describe('PayementsController', () => {
  let controller: PayementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayementsController],
    }).compile();

    controller = module.get<PayementsController>(PayementsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
