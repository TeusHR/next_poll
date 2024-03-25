import { Test, TestingModule } from "@nestjs/testing";
import { CooperationService } from "./cooperation.service";

describe("CooperationService", () => {
  let service: CooperationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CooperationService],
    }).compile();

    service = module.get<CooperationService>(CooperationService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
