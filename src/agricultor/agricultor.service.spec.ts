import { Test, TestingModule } from '@nestjs/testing';
import { AgricultorService } from './agricultor.service';

describe('AgricultorService', () => {
  let service: AgricultorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AgricultorService],
    }).compile();

    service = module.get<AgricultorService>(AgricultorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
