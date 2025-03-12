import { PartialType } from "@nestjs/mapped-types";
import { CreateConferenceFileDto } from "./create-conference-file.dto";

export class UpdateConferenceFileDto extends PartialType(
  CreateConferenceFileDto,
) {}
