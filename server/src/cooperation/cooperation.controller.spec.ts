import { Test, TestingModule } from "@nestjs/testing";
import { CooperationController } from "./cooperation.controller";
import { CooperationService } from "./cooperation.service";

describe("CooperationController", () => {
  let controller: CooperationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CooperationController],
      providers: [CooperationService],
    }).compile();

    controller = module.get<CooperationController>(CooperationController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
