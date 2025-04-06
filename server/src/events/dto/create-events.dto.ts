import {
  IsArray,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import { Transform } from "class-transformer";
import { Language } from "@prisma/client";

export class CreateEventsDto {
  @IsString()
  @Transform(({ value }) => value?.toString().trim())
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.toString().trim())
  text: string;

  @IsOptional()
  @IsString()
  link: string;

  @IsOptional()
  @IsString()
  roomNumber: string;

  @IsISO8601()
  @IsNotEmpty()
  date: string;

  @IsOptional()
  @IsISO8601()
  @IsNotEmpty()
  toDate: string;

  @IsOptional()
  @IsString({ each: true })
  @IsArray()
  supervisor: string[];

  @IsEnum(Language)
  language: Language;
}
