import { Test, TestingModule } from "@nestjs/testing";
import { ResearchWorkService } from "./research-work.service";

describe("ResearchWorkService", () => {
  let service: ResearchWorkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResearchWorkService],
    }).compile();

    service = module.get<ResearchWorkService>(ResearchWorkService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
