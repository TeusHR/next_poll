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

  @IsString()
  @Transform(({ value }) => value?.toString().trim())
  @IsNotEmpty()
  description: string;
}

class Organization {
  @IsString()
  @Transform(({ value }) => value?.toString().trim())
  @IsNotEmpty()
  image: string;

  @IsString()
  @Transform(({ value }) => value?.toString().trim())
  @IsNotEmpty()
  title: string;

  @IsString()
  @Transform(({ value }) => value?.toString().trim())
  @IsNotEmpty()
  link: string;
}

export class CreateDIGAMDto {
  @IsString()
  @Transform(({ value }) => value?.toString().trim())
  @IsNotEmpty()
  text: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Organization)
  organizations: any[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ForeignUniversity)
  foreignUniversities: any[];

  @IsEnum(Language)
  language: Language;
}
