import { Test, TestingModule } from "@nestjs/testing";
import { ScienceSchoolController } from "./science-school.controller";
import { ScienceSchoolService } from "./science-school.service";

describe("ScienceSchoolController", () => {
  let controller: ScienceSchoolController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScienceSchoolController],
      providers: [ScienceSchoolService],
    }).compile();

    controller = module.get<ScienceSchoolController>(ScienceSchoolController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
