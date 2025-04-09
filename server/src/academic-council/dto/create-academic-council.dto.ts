import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Language } from "@prisma/client";
import { Transform } from "class-transformer";

export class CreateAcademicCouncilDto {
  @IsString()
  @Transform(({ value }) => value?.toString().trim())
  @IsNotEmpty()
  title: string;

  @IsString()
  @Transform(({ value }) => value?.toString().trim())
  @IsNotEmpty()
  text: string;

  @IsEnum(Language)
  language: Language;
}
