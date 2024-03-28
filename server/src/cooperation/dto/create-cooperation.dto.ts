import { IsNotEmpty, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class CreateCooperationDto {
  @IsString()
  @Transform(({ value }) => value?.toString().trim())
  @IsNotEmpty()
  title: string;

  @IsString()
  @Transform(({ value }) => value?.toString().trim())
  @IsNotEmpty()
  text: string;
}
