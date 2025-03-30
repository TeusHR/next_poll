import { PartialType } from "@nestjs/mapped-types";
import { CreateScienceCompetitionDto } from "./create-science-competition.dto";

export class UpdateScienceCompetitionDto extends PartialType(
  CreateScienceCompetitionDto,
) {}
