import { IsNotEmpty, IsString } from "class-validator";

export class CreateScienceSchoolDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  text: string;
}
