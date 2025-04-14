import { IsArray, IsEmail, IsNotEmpty, IsString } from "class-validator";
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

  @IsArray()
  @IsNotEmpty()
  value: number;

  @IsArray()
  @IsNotEmpty()
  question: object[];

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  age: string;
}
