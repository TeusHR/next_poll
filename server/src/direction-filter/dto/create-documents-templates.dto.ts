import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Language } from "@prisma/client";

export class CreateDirectionFilterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(Language)
  language: Language;
}
