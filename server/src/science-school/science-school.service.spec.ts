import { Test, TestingModule } from "@nestjs/testing";
import { ScienceSchoolService } from "./science-school.service";

describe("ScienceSchoolService", () => {
  let service: ScienceSchoolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScienceSchoolService],
    }).compile();

    service = module.get<ScienceSchoolService>(ScienceSchoolService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
