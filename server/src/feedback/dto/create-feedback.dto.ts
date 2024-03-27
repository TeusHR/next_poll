import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class CreateFeedbackDto {
  @IsString()
  @Transform(({ value }) => value?.toString().trim())
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @Transform(({ value }) => value?.toString().trim())
  @IsNotEmpty()
  email: string;

  @IsString()
  @Transform(({ value }) => value?.toString().trim())
  @IsNotEmpty()
  text: string;
}
