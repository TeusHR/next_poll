import { IsNotEmpty, IsString } from "class-validator";

export class CreateCooperationDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  text: string;
}
