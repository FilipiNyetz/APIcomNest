import { Test, TestingModule } from '@nestjs/testing';
import { AgricultorController } from './agricultor.controller';
import { AgricultorService } from './agricultor.service';

describe('AgricultorController', () => {
  let controller: AgricultorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgricultorController],
      providers: [AgricultorService],
    }).compile();

    controller = module.get<AgricultorController>(AgricultorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
