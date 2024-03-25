import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateInnovationDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsOptional()
  @IsString({ each: true })
  files: string[];

  @IsOptional()
  @IsString({ each: true })
  images: string[];
}
