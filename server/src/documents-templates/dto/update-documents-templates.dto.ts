import { PartialType } from "@nestjs/mapped-types";
import { CreateDocumentsTemplatesDto } from "./create-documents-templates.dto";

export class UpdateDocumentsTemplatesDto extends PartialType(
  CreateDocumentsTemplatesDto,
) {}
