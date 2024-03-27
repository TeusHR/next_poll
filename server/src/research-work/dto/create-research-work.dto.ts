import { IsNotEmpty, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class CreateResearchWorkDto {
  @IsString()
  @Transform(({ value }) => value?.toString().trim())
  @IsNotEmpty()
  title: string;

  @IsString()
  @Transform(({ value }) => value?.toString().trim())
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsNotEmpty()
  image: string;
}
