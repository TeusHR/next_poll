import { PartialType } from "@nestjs/mapped-types";
import { CreateInternationalPracticeDto } from "./create-international-practice.dto";

export class UpdateInternationalPracticeDto extends PartialType(
  CreateInternationalPracticeDto,
) {}
