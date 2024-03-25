import { PartialType } from "@nestjs/mapped-types";
import { CreateResearchWorkDto } from "./create-research-work.dto";

export class UpdateResearchWorkDto extends PartialType(CreateResearchWorkDto) {}
