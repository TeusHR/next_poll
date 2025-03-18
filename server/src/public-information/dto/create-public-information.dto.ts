import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Language } from "@prisma/client";
import { Transform } from "class-transformer";

export class CreatePublicInformationDto {
  @IsString()
  @Transform(({ value }) => value?.toString().trim())
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString({ each: true })
  files: string[];

  @IsEnum(Language)
  language: Language;
}
