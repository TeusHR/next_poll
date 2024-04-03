import { Test, TestingModule } from '@nestjs/testing';
import { LaboratoryDevelopmentController } from './laboratory-development.controller';
import { LaboratoryDevelopmentService } from './laboratory-development.service';

describe('LaboratoryDevelopmentController', () => {
  let controller: LaboratoryDevelopmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LaboratoryDevelopmentController],
      providers: [LaboratoryDevelopmentService],
    }).compile();

    controller = module.get<LaboratoryDevelopmentController>(LaboratoryDevelopmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
