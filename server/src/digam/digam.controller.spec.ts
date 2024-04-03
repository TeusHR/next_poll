import { Test, TestingModule } from "@nestjs/testing";
import { DigamController } from "./digam.controller";
import { DigamService } from "./digam.service";

describe("DigamController", () => {
  let controller: DigamController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DigamController],
      providers: [DigamService],
    }).compile();

    controller = module.get<DigamController>(DigamController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
