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


class Organization {
  @IsString()
  @Transform(({ value }) => value?.toString().trim())
  @IsNotEmpty()
  image: string;

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
  link: string;
}

export class CreateAssociationsDto {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Organization)
  organizations: any[];

  @IsEnum(Language)
  language: Language;
}
