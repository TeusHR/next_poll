import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Transform } from "class-transformer";
import { Language } from "@prisma/client";

export class CreateActivityDto {
  @IsString()
  @Transform(({ value }) => value?.toString().trim())
  @IsNotEmpty()
  title: string;

  @IsString()
  @Transform(({ value }) => value?.toString().trim())
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsEnum(Language)
  language: Language;
}
