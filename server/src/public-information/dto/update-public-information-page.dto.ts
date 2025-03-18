import { PartialType } from "@nestjs/mapped-types";
import { CreatePublicInformationPageDto } from "./create-public-information-page.dto";

export class UpdatePublicInformationPageDto extends PartialType(
  CreatePublicInformationPageDto,
) {}
