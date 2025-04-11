import { PartialType } from "@nestjs/mapped-types";
import { CreateCysDto } from "./create-cys.dto";

export class UpdateCysDto extends PartialType(CreateCysDto) {}
