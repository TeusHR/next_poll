import { Test, TestingModule } from "@nestjs/testing";
import { InternationalProjectService } from "./international-project.service";

describe("InternationalProjectService", () => {
  let service: InternationalProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InternationalProjectService],
    }).compile();

    service = module.get<InternationalProjectService>(
      InternationalProjectService,
    );
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
