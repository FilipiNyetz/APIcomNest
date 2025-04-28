import { Test, TestingModule } from '@nestjs/testing';
import { ParceirasMarketingController } from './parceiras-marketing.controller';
import { ParceirasMarketingService } from './parceiras-marketing.service';

describe('ParceirasMarketingController', () => {
  let controller: ParceirasMarketingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParceirasMarketingController],
      providers: [ParceirasMarketingService],
    }).compile();

    controller = module.get<ParceirasMarketingController>(ParceirasMarketingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
