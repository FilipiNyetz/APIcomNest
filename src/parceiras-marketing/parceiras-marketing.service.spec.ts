import { Test, TestingModule } from '@nestjs/testing';
import { ParceirasMarketingService } from './parceiras-marketing.service';

describe('ParceirasMarketingService', () => {
  let service: ParceirasMarketingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParceirasMarketingService],
    }).compile();

    service = module.get<ParceirasMarketingService>(ParceirasMarketingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
