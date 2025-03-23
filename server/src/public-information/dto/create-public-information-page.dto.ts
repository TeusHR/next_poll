import { IsNotEmpty, IsOptional, IsString, ValidateIf } from "class-validator";
import { Transform } from "class-transformer";

export class CreatePublicInformationPageDto {
  @IsString()
  @Transform(({ value }) => value?.toString().trim())
  @IsNotEmpty()
  title: string;

  @ValidateIf((o) => !o.documentsTemplatesId)
  @IsString()
  @IsNotEmpty()
  publicInformationId?: string;

  @ValidateIf((o) => !o.publicInformationId)
  @IsString()
  @IsNotEmpty()
  documentsTemplatesId?: string;

  @IsOptional()
  @IsString({ each: true })
  files: string[];
}
