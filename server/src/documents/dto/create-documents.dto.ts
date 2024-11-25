import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";
import { Language } from "@prisma/client";

export class CreateDocumentsDto {
  @IsString()
  @Transform(({ value }) => value?.toString().trim())
  @IsNotEmpty()
  title: string;

  @IsString()
  @Transform(({ value }) => value?.toString().trim())
  @IsNotEmpty()
  text: string;

  @IsOptional()
  @IsString({ each: true })
  files: string[];

  @IsEnum(Language)
  language: Language;
}
