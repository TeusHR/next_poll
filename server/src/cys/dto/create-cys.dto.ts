import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Language } from "@prisma/client";
import { Transform } from "class-transformer";

export class CreateCysDto {
  @IsString()
  @Transform(({ value }) => value?.toString().trim())
  @IsNotEmpty()
  text: string;

  @IsEnum(Language)
  language: Language;
}
