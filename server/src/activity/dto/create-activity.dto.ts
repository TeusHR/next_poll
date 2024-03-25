import { IsNotEmpty, IsString } from "class-validator";

export class CreateActivityDto {
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
