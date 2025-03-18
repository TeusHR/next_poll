import { PartialType } from "@nestjs/mapped-types";
import { CreatePublicInformationDto } from "./create-public-information.dto";

export class UpdatePublicInformationDto extends PartialType(
  CreatePublicInformationDto,
) {}
