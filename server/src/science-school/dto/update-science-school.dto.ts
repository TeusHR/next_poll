import { PartialType } from "@nestjs/mapped-types";
import { CreateScienceSchoolDto } from "./create-science-school.dto";

export class UpdateScienceSchoolDto extends PartialType(
  CreateScienceSchoolDto,
) {}
