import {
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import { ConferenceType } from "@prisma/client";

export class CreateConferenceDto {
  @IsISO8601()
  @IsNotEmpty()
  date: string;

  @IsEnum(ConferenceType)
  @IsNotEmpty()
  type: ConferenceType;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsOptional()
  @IsString({ each: true })
  files: string[];
}
