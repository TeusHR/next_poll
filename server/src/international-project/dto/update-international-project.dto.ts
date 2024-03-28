import { PartialType } from "@nestjs/mapped-types";
import { CreateInternationalProjectDto } from "./create-international-project.dto";

export class UpdateInternationalProjectDto extends PartialType(
  CreateInternationalProjectDto,
) {}
