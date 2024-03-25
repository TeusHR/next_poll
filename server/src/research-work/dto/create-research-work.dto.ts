import { IsNotEmpty, IsString } from "class-validator";

export class CreateResearchWorkDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsNotEmpty()
  image: string;
}
