import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { Transform, Type } from "class-transformer";
import { Language } from "@prisma/client";

class ForeignUniversity {
  @IsString()
  @Transform(({ value }) => value?.toString().trim())
  @IsNotEmpty()
  country: string;

  @IsString()
  @Transform(({ value }) => value?.toString().trim())
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString({ each: true })
  files: string[];

  @IsString()
  @Transform(({ value }) => value?.toString().trim())
  @IsNotEmpty()
  description: string;
}

export class CreateAgreementsDto {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ForeignUniversity)
  foreignUniversities: any[];

  @IsEnum(Language)
  language: Language;
}
