import { Test, TestingModule } from '@nestjs/testing';
import { InternationalProjectController } from './international-project.controller';
import { InternationalProjectService } from './international-project.service';

describe('InternationalProjectController', () => {
  let controller: InternationalProjectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InternationalProjectController],
      providers: [InternationalProjectService],
    }).compile();

    controller = module.get<InternationalProjectController>(InternationalProjectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
