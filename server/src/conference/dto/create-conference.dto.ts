import {
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import { ConferenceType } from "@prisma/client";
import { Transform } from "class-transformer";

export class CreateConferenceDto {
  @IsISO8601()
  @IsNotEmpty()
  date: string;

  @IsEnum(ConferenceType)
  @IsNotEmpty()
  type: ConferenceType;

  @IsString()
  @Transform(({ value }) => value?.toString().trim())
  @IsNotEmpty()
  country: string;

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
}
