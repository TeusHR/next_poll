import { IsEmail, IsString, MinLength } from "class-validator";
import { Transform } from "class-transformer";

export class LoginDto {
  @IsString()
  @IsEmail()
  @Transform(({ value }) => value?.toString().trim())
  email: string;

  @IsString()
  password: string;
}

export class RegisterDto extends LoginDto {
  @IsString()
  @Transform(({ value }) => value?.toString().trim())
  @MinLength(5)
  name: string;
}
