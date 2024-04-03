import { Test, TestingModule } from "@nestjs/testing";
import { DigamService } from "./digam.service";

describe("DigamService", () => {
  let service: DigamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DigamService],
    }).compile();

    service = module.get<DigamService>(DigamService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
