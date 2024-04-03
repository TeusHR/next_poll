import { Test, TestingModule } from "@nestjs/testing";
import { LaboratoryDevelopmentService } from "./laboratory-development.service";

describe("LaboratoryDevelopmentService", () => {
  let service: LaboratoryDevelopmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LaboratoryDevelopmentService],
    }).compile();

    service = module.get<LaboratoryDevelopmentService>(
      LaboratoryDevelopmentService,
    );
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
