import { PartialType } from "@nestjs/mapped-types";
import { CreateCooperationDto } from "./create-cooperation.dto";

export class UpdateCooperationDto extends PartialType(CreateCooperationDto) {}
