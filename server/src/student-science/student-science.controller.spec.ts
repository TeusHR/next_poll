import { Test, TestingModule } from '@nestjs/testing';
import { StudentScienceController } from './student-science.controller';
import { StudentScienceService } from './student-science.service';

describe('StudentScienceController', () => {
  let controller: StudentScienceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentScienceController],
      providers: [StudentScienceService],
    }).compile();

    controller = module.get<StudentScienceController>(StudentScienceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
