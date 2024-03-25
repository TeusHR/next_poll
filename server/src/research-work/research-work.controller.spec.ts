import { Test, TestingModule } from "@nestjs/testing";
import { ResearchWorkController } from "./research-work.controller";
import { ResearchWorkService } from "./research-work.service";

describe("ResearchWorkController", () => {
  let controller: ResearchWorkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResearchWorkController],
      providers: [ResearchWorkService],
    }).compile();

    controller = module.get<ResearchWorkController>(ResearchWorkController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
