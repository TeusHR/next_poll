import { Test, TestingModule } from "@nestjs/testing";
import { InnovationController } from "./innovation.controller";
import { InnovationService } from "./innovation.service";

describe("InnovationController", () => {
  let controller: InnovationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InnovationController],
      providers: [InnovationService],
    }).compile();

    controller = module.get<InnovationController>(InnovationController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
