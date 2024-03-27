import { Test, TestingModule } from "@nestjs/testing";
import { StudentScienceService } from "./student-science.service";

describe("StudentScienceService", () => {
  let service: StudentScienceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentScienceService],
    }).compile();

    service = module.get<StudentScienceService>(StudentScienceService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
