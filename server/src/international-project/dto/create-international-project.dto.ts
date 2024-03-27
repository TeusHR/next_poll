import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class CreateInternationalProjectDto {
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

  @IsOptional()
  @IsString({ each: true })
  images: string[];
}
