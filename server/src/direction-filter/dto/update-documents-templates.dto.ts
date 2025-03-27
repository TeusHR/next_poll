import { PartialType } from "@nestjs/mapped-types";
import { CreateDirectionFilterDto } from "./create-documents-templates.dto";

export class UpdateDirectionFilterDto extends PartialType(
  CreateDirectionFilterDto,
) {}
