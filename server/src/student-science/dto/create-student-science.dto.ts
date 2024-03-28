import { IsNotEmpty, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class CreateStudentScienceDto {
  @IsString()
  @Transform(({ value }) => value?.toString().trim())
  @IsNotEmpty()
  text: string;
}
