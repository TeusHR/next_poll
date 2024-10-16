import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from "class-validator";
import { Transform, Type } from "class-transformer";
import { Language } from "@prisma/client";

class Image {
  @IsString()
  @Transform(({ value }) => value?.toString().trim())
  @IsNotEmpty()
  image: string;

  @IsString()
  @Transform(({ value }) => value?.toString().trim())
  @IsNotEmpty()
  description: string;
}

export class CreateConsultingDto {
  @IsString()
  @Transform(({ value }) => value?.toString().trim())
  @IsNotEmpty()
  title: string;

  @IsString()
  @Transform(({ value }) => value?.toString().trim())
  @IsNotEmpty()
  text: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Image)
  images: any[];

  @IsEnum(Language)
  language: Language;
}
