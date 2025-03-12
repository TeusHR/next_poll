import { IsEnum, IsOptional, IsString } from "class-validator";
import { Language } from "@prisma/client";

export class CreateConferenceFileDto {
  @IsOptional()
  @IsString({ each: true })
  files: string[];

  @IsEnum(Language)
  language: Language;
}
