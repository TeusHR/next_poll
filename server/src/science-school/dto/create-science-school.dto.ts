import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Transform } from "class-transformer";
import { Language } from "@prisma/client";

export class CreateScienceSchoolDto {
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
