import { PartialType } from "@nestjs/mapped-types";
import { CreateAcademicCouncilDto } from "./create-academic-council.dto";

export class UpdateAcademicCouncilDto extends PartialType(
  CreateAcademicCouncilDto,
) {}
